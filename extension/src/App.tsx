import FilterBar from './components/FilterBar';
import Table from './components/Table';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [filterInput, setFilterInput] = useState('');

  const [filteredEntries, setFilteredEntries] = useState([]);

  const saveToStorage = (entry) => {
    chrome.storage.local.get(['entries'], (result) => {
      let updatedEntries = result.entries ? [...result.entries, entry] : [entry];
      chrome.storage.local.set({ entries: updatedEntries });
    });
  };

  const loadFromStorage = () => {
    chrome.storage.local.get(['entries', 'filterInput'], (result) => {
      if (result.entries) {
        setEntries(result.entries);
      }
      if (result.filterInput) {
        setFilterInput(result.filterInput);
      }
    });
  };

  const handleInput = (filterInput) => {
    console.log(filterInput);
    setFilterInput(filterInput);
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.data) {
        const newEntry = JSON.parse(message.data);
        setEntries((prevEntries) => [...prevEntries, newEntry]);
        saveToStorage(newEntry);
      }
    });
  }, []);

  useEffect(() => {
    setFilteredEntries(
      entries.filter((entry) =>
        JSON.stringify(Object.values(entry.request))
          .toLowerCase()
          .includes(filterInput.toLowerCase())
      )
    );
  }, [entries, filterInput]);

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <div>
      <div className="App">
        <FilterBar handleInput={handleInput} />
        <br />
        <Table filteredEntries={filteredEntries} />
        <Footer entries={entries} filteredEntries={filteredEntries} />
      </div>
    </div>
  );
}
