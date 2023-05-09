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
      <button className="close-button" onClick={onClose}>
        x
      </button>
      <div className="tabs">
        {['Headers', 'Response', 'Timing', 'Tab4', 'Tab5'].map((tab, index) => (
          <button key={index} onClick={() => handleTabClick(index)}>
            {tab}
          </button>
        ))}
      </div>
      <ModalContent data={data} activeTab={activeTab} />
    </div>
  );
};

export default Modal;
