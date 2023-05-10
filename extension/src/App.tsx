//import all components
import FilterBar from "./components/FilterBar";
import HARTable from "./components/Table";
import Footer from "./components/Footer";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

import { StyledEngineProvider } from "@mui/material/styles";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  const [filteredEntries, setFilteredEntries] = useState([]);

  const handleInput = (filterInput) => {
    //use array.filter?
    //check through each entry in array to see if it contains the string
    //setFilteredEntries to be only the subset of entries that contains the string
    console.log(filterInput);
    setFilterInput(filterInput);
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.data) {
        console.log(
          "Received message from service worker in App.tsx:  ",
          message.data
        );
        // entries.push(JSON.parse(message.data));
        setEntries([...entries, JSON.parse(message.data)]);
      }
    });
  });

  useEffect(() => {
    setFilteredEntries(
      entries.filter((entry) =>
        //helper function to take entry, extract relevant fields, return array. That way we can search by everything, not just URL
        JSON.stringify(Object.values(entry.request))
          .toLowerCase()
          .includes(filterInput.toLowerCase())
      )
    );
  }, [entries, filterInput]);

  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Button variant="contained">Hello World</Button>
        <div className="App">
          <FilterBar handleInput={handleInput} />
          <br />
          <HARTable filteredEntries={filteredEntries} />
          <Footer entries={entries} filteredEntries={filteredEntries} />
        </div>
      </div>
    </StyledEngineProvider>
  );
}
