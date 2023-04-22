import "../styles.css";
//import sub-components

const FilterBar = (props) => {

const { entries, handleInput } = props

  return (
    <div className={"filterBar"}>
      <input type="text" id="input" placeholder="Filter" onChange={() => handleInput()}></input>
    </div>
  );
};

export default FilterBar;
