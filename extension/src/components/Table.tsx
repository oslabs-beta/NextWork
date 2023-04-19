import "../styles.css";
//import row sub-component

const Table = (/*props*/) => {
  //const blah = React.useState(0);
  //React.useEffect(() => {set some state})
  return (
    <div className={'table'}>
      possibly pass some state define some table headings
      <tr>
        <th scope="col">Player</th>
        <th scope="col">Gloobles</th>
        <th scope="col">Za'taak</th>
      </tr>
      render some rows, pass some props map over har entries and render a row
      for each entry
    </div>
  );
};

export default Table;
