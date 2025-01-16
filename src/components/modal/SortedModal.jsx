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
      <div
        className='inset-0 model-overlay absolute'
        onClick={closeModal}>
        <div
          className='bg-white p-4 rounded w-44 h-44 overflow-y-auto absolute top-[13%] left-[65%]'
          onClick={(e) => e.stopPropagation()} // Prevent click propagation
        >
          <ul className='max-h-64 overflow-y-auto mt-4'>
            {modalData.map((value, id) => (
              <li
                key={id}
                className='flex items-center space-x-2'>
                <input
                  id={id}
                  type='checkbox'
                  checked={selectedValues.includes(value)}
                  onChange={() => handleSelection(value)}
                />
                <label htmlFor={id}>{value}</label>
              </li>
            ))}
          </ul>
          <div className='flex justify-end space-x-4 mt-4'>
            <button
              onClick={clearFilter}
              className='text-red-500'>
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
