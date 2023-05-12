import "../styles.css";
//import sub-components

const Footer = (props) => {
  const { entries, filteredEntries } = props;

  //how many har entries are in the array?
  const requests = `${filteredEntries.length}/${entries.length}`;

  //for each entry, add the total number of kb transferred over network. I think this is adding all the header sizes plus all the body sizes.
  const kbTransferred = () => {
    let total = 0;
    entries.forEach((entry) => {
      total += entry.request.headersSize;
      total += entry.request.bodySize;
      total += entry.response.headersSize;
      total += entry.response.bodySize;
    });
    return total;
  };

  //uncompressed resources loaded by the page.
  const kbResources = () => {
    let total = 0;
    entries.forEach((entry) => {
      total += entry.response.content.size;
    });
    return total;
  };

  const finish = () => {
    let total = 0;
    entries.forEach((entry) => {
      total += entry.time;
    });
    return total;
  };
  //this should be blue
  const domContentLoaded = 0;
  //this should be red
  const load = 0;

  return (
    <footer className={"footer"}>
      <p>
        {requests} requests | {kbTransferred()} kB transferred | {kbResources()}{" "}
        kB resources | Finish: {finish()} ms | DOMContentLoaded:{" "}
        {domContentLoaded} ms | Load: {load} ms
      </p>
    </footer>
  );
};

export default Footer;

//x/y requests  |  xx kB transferred  |  xx kB resources  |  Finish: xx ms  |  DOMContentLoaded: xx ms  |  Load: xx ms
