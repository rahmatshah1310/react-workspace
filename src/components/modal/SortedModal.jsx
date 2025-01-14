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
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  console.log(selectedValues);

  if (!showModal) return null; // Don't render anything if the modal is not shown

  return (
    <div
      className='inset-0 absolute flex justify-center items-start'
      onClick={closeModal}>
      <div
        className='bg-white p-4 rounded mt-14 w-44 h-44 overflow-y-auto'
        onClick={(e) => e.stopPropagation()}>
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
  );
};

export default SortedModal;
