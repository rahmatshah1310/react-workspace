/** @format */

import React from "react";

const SortedModal = ({ showModal, modalData, handleSort, closeModal }) => {
  return (
    <div>
      {showModal && (
        <div className='modal-overlay fixed inset-0 bg-black bg-opacity-50'>
          <div className='bg-white p-2 rounded shadow-lg w-56 max-h-[200px] overflow-y-auto mt-16 ml-16'>
            <ul>
              {modalData.map((value, index) => (
                <li
                  key={index}
                  className='cursor-pointer hover:bg-gray-200 p-2'
                  onClick={() => handleSort(value)}>
                  {value}
                </li>
              ))}
            </ul>
            <button
              onClick={closeModal}
              className='bg-blue-700 text-white p-2 w-full mt-2'>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortedModal;
