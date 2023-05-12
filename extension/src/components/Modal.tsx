import React, { useState } from 'react';
import ModalContent from './ModalContent';

interface ModalProps {
  onClose: () => void;
  data?: any;
  rowIndex?: number;
}

const Modal: React.FC<ModalProps> = ({ onClose, data, rowIndex }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="modal">
      <br />
      <table className="har-table">
        <tr>
          <td>
            <div className="tabs">
              {['Headers', 'Response', 'Timing'].map((tab, index) => (
                <button className="tab" key={index} onClick={() => handleTabClick(index)}>
                  {tab}
                </button>
              ))}
            </div>
          </td>
          <td>
            <ModalContent data={data} activeTab={activeTab} />
          </td>
          <td>
            <button className="close-button" onClick={onClose}>
              x
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Modal;
