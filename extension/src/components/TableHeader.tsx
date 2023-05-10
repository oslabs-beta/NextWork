// import "../styles.css";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

//import sub-components

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="right">URL</TableCell>
        <TableCell align="right">Method</TableCell>
        <TableCell align="right">Status</TableCell>
        <TableCell align="right">Type</TableCell>
        <TableCell align="right">Size</TableCell>
        <TableCell align="right">Time</TableCell>
        <TableCell align="right">Waterfall</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
