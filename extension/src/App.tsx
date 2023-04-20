//import all components
import FilterBar from "./components/FilterBar";
import Table from "./components/Table";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      set some state
      <div className="App">
        <FilterBar />
        <Table />
        <Footer />
      </div>
    </div>
  );
}
