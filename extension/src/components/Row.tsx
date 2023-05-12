import '../styles.css';
//import sub-components
import WaterfallBar from './WaterfallBar';
const Row = (props) => {
  //get har entry
  const {
    key,
    name,
    method,
    status,
    type,
    size,
    timings,
    time,
    onClick,
    waterfallbar,
  } = props;
  //total time is sum of timings
  // let timea = 0;
  // for (let key in timings) {
  //   timea += timings[key[1]] - timings[key[0]];
  // }
  //const blah = React.useState(0);
  //React.useEffect(() => {set some state})
  return (
    <tr>
      <td onClick={onClick}>{name}</td>
      <td>{method}</td>
      <td>{status}</td>
      <td>{type}</td>
      <td>{size} bytes</td>
      <td>{time} ms</td>
      <td>
        <WaterfallBar timings={waterfallbar} />
      </td>
    </tr>
  );
};

export default Row;
