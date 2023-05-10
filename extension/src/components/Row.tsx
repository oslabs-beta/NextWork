// import "../styles.css";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

//import sub-components

const Row = (props) => {
  //get har entry
  const { key, name, method, status, type, size, timings, time } = props;
  //total time is sum of timings
  // let timea = 0;
  // for (let key in timings) {
  //   timea += timings[key[1]] - timings[key[0]];
  // }
  //const blah = React.useState(0);
  //React.useEffect(() => {set some state})
  return (
    <TableRow
      key={key}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell scope="row" align="left">
        {name}
      </TableCell>
      <TableCell align="right">{method}</TableCell>
      <TableCell align="right">{status}</TableCell>
      <TableCell align="right">{type}</TableCell>
      <TableCell align="right">{size} bytes</TableCell>
      <TableCell align="right">{time} ms</TableCell>
    </TableRow>
  );
};

export default Row;
