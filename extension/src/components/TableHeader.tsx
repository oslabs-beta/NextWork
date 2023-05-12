import "../styles.css";
//import sub-components

const TableHeader = () => {
  return (
    <tr>
      <th scope="col" id="name" className="th">
        URL
      </th>
      <th scope="col" id="method">
        Method
      </th>
      <th scope="col" id="status">
        Status
      </th>
      <th scope="col" id="type">
        Type
      </th>
      <th scope="col" id="size">
        Size
      </th>
      <th scope="col" id="time">
        Time
      </th>
      <th scope="col" id="waterfall">
        Waterfall
      </th>
    </tr>
  );
};

export default TableHeader;
