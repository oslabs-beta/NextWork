import React from 'react';
import WaterfallChart from './WaterfallChart';

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
      <table>
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
    ['Headers', 'Response', 'Timing', 'Tab4', 'Tab5'][activeTab] === 'Headers';
  const isTimingTab =
    ['Headers', 'Response', 'Timing', 'Tab4', 'Tab5'][activeTab] === 'Timing';

  return (
    <div className="tab-content">
      <h3>{`Content for ${
        ['Headers', 'Response', 'Timing', 'Tab4', 'Tab5'][activeTab]
      }`}</h3>
      {isHeadersTab ? (
        <>
          <h4>Request Headers</h4>
          {renderHeaders(data.request.headers)}
          <h4>Response Headers</h4>
          {renderHeaders(data.response.headers)}
        </>
      ) : isTimingTab ? (
        <WaterfallChart timings={data.timings} />
      ) : (
        <p>More info about {data.request.url} goes here</p>
      )}
    </div>
  );
};

export default ModalContent;
