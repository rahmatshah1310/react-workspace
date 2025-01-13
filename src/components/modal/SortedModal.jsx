/** @format */

import React, { useState } from "react";

const SortedModal = ({
  showModal,
  modalData,
  applyFilter,
  closeModal,
  clearFilter,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelection = (value) => {
    setSelectedValues(
      (prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // Deselect value
          : [...prev, value] // Select value
    );
  };

  return (
    showModal && (
      <div className='inset-0 absolute  flex justify-center'>
        <div className='bg-white p-4 rounded mt-16 ml-56 w-44 h-44 overflow-y-auto'>
          <ul className='max-h-64 overflow-y-auto mt-4'>
            {modalData.map((value, index) => (
              <li
                key={index}
                className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  checked={selectedValues.includes(value)}
                  onChange={() => handleSelection(value)}
                />
                <span>{value}</span>
              </li>
            ))}
          </ul>
          <div className='flex justify-end space-x-4 mt-4'>
            <button
              onClick={() => clearFilter()}
              className='px-4 py-2 bg-gray-200 rounded'>
              Reset
            </button>
            <button
              onClick={() => applyFilter(selectedValues)}
              className='px-4 py-2 bg-blue-500 text-white rounded'>
              OK
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SortedModal;
