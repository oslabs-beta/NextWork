import "../styles.css";
import Row from "./Row";
import TableHeader from "./TableHeader";

//import row sub-component

const Table = (props) => {
  const { filteredEntries } = props;
  //const blah = React.useState(0);
  //React.useEffect(() => {set some state})
  // const entries = [
  //   {
  //     request: {
  //       url: "blah",
  //       method: "GET",
  //     },
  //     response: {
  //       status: 200,
  //       content: {
  //         mimeType: "App/JSON",
  //         size: 450,
  //       },
  //     },
  //     timings: [1, 2, 3],
  //   },
  // ];

  return (
    <table className={"table"}>
      <TableHeader />
      {filteredEntries.map((entry, index) => (
        <Row
          key={index}
          name={entry.request.url}
          method={entry.request.method}
          status={entry.response.status}
          type={entry.response.content.mimeType}
          size={entry.response.bodySize} //response.content.size is uscompressed
          timings={entry.timings}
          time={entry.time}
        />
      ))}
    </table>
  );
};

export default Table;
