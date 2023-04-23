import "../styles.css";
//import sub-components

const FilterBar = (props) => {
  const { handleInput } = props;

  return (
    <div className={"filterBar"}>
      <input
        type="text"
        id="input"
        placeholder="Filter"
        onChange={(event) => {
          handleInput(event.currentTarget.value);
        }}
      ></input>
    </div>
  );
};

export default FilterBar;
