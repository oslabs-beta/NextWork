// import "../styles.css";
import Row from "./Row";
import TableContainer from "@mui/material/TableContainer";
import TableHeader from "./TableHeader";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";

//import row sub-component

const HARTable = (props) => {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a HAR log table">
        <TableHeader />
        <TableBody>
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HARTable;
