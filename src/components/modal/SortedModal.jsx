/** @format */

import React, { useState } from "react";

const SortedModal = ({
  showModal,
  closeModal,
  handleSort,
  modalData,
  data,
  setSortedData,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (value) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((item) => item !== value) // Deselect
          : [...prevSelected, value] // Select
    );
  };

  const filterDataBySelected = () => {
    const filteredData = data.filter(
      (row) => selectedItems.some((item) => row[columnName] === item) // Filter rows based on selected items
    );
    setSortedData(filteredData);
  };

  const handleSortClick = (columnName) => {
    handleSort(columnName);
    filterDataBySelected();
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className='fixed inset-0'>
          <div className='bg-white p-2 rounded shadow-lg w-44 max-h-[200px] overflow-y-auto mx-auto mt-14 align-center'>
            <ul>
              {modalData.map((value, index) => (
                <li
                  key={index}
                  className='cursor-pointer hover:bg-gray-200 p-2 flex items-center'
                  onClick={() => handleSortClick(value)}>
                  <input
                    type='checkbox'
                    className='mr-2'
                    checked={selectedItems.includes(value)} // Show checkbox as checked if selected
                    onChange={() => handleCheckboxChange(value)}
                  />
                  {value}
                </li>
              ))}
            </ul>
            <div className='flex justify-between'>
              <button onClick={closeModal}>RESET</button>
              <button
                onClick={closeModal}
                className='bg-blue-700 text-white p-2 rounded'>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortedModal;
