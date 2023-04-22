//import all components
import FilterBar from "./components/FilterBar";
import Table from "./components/Table";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

export default function App() {
  const [entries, setEntries] = useState([]);

  const [filteredEntries, setFilteredEntries] = useState(entries);

  const handleInput = (str) => {
    //use array.filter?
    //check through each entry in array to see if it contains the string
    //setFilteredEntries to be only the subset of entries that contains the string
    setFilteredEntries(entries.filter((entry) => entry.request.url.includes(str)));
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

  return (
    <div>
      <div className="App">
        <FilterBar entries={entries} handleInput={ handleInput} />
        <Table filteredEntries={filteredEntries} />
        {/* <Footer /> */}
      </div>
    </div>
  );
}
