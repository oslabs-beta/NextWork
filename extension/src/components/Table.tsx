import React, { useState } from 'react';
import '../styles.css';
import Modal from './Modal';
import Row from './Row';
import TableHeader from './TableHeader';

const Table = (props) => {
  const { filteredEntries } = props;

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
    setShowModal(true);
  };

  return (
    <>
      <table className={'har-table'}>
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
            onClick={() => handleRowClick(index)}
            waterfallbar={entry.timings}
          />
        ))}
      </table>
      {showModal && selectedRow !== null && filteredEntries.length > 0 && (
        <Modal
          onClose={() => setShowModal(false)}
          data={filteredEntries[selectedRow]}
          rowIndex={selectedRow}
        />
      )}
    </>
  );
};

export default Table;
