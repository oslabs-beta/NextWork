import React from "react";
import WaterfallChart from "./WaterfallChart";

interface ModalContentProps {
  data: any;
  activeTab: number;
}

interface Headers {
  key?: string;
  name?: string;
  value: string;
}

const ModalContent: React.FC<ModalContentProps> = ({ data, activeTab }) => {
  const renderHeaders = (headers: Headers[]) => {
    return (
      <table className="har-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header, index) => (
            <tr key={index}>
              <td>{header.key || header.name}</td>
              <td>{header.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const isHeadersTab =
    ["Headers", "Response", "Timing", "Tab4", "Tab5"][activeTab] === "Headers";
  const isTimingTab =
    ["Headers", "Response", "Timing", "Tab4", "Tab5"][activeTab] === "Timing";

  return (
    <div className="tab-content" style={{ maxWidth: '100%' }}>
      {/* <h3>{`Content for ${
        ['Headers', 'Response', 'Timing', 'Tab4', 'Tab5'][activeTab]
      }`}</h3> */}
      {isHeadersTab ? (
        <table className="har-table" id="req-res-table">
          <thead>
            <tr>
              <td>Request Headers</td>
              <td>Response Headers</td>
            </tr>
          </thead>
          <tr>
            <td>{renderHeaders(data.request.headers)}</td>
            <td style={{ maxWidth: '100%' }}>{renderHeaders(data.response.headers)}</td>
          </tr>
        </table>
      ) : isTimingTab ? (
        <WaterfallChart timings={data.timings} />
      ) : (
        <p>More info about {data.request.url} goes here</p>
      )}
    </div>
  );
};

export default ModalContent;
