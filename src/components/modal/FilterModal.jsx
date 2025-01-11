/** @format */

import React, { useState } from "react";
import { SearchIcon } from "../../assets/icons/Icons";

const FilterModal = ({
  showModal,
  filterSearch,
  setFilterSearch,
  columns,
  initialColumns,
  handleColumnToggle,
  closeModal,
}) => {
  const handleSearchChange = (e) => {
    setFilterSearch(e.target.value);
  };

  return (
    showModal && (
      <div
        className='modal-overlay fixed inset-0 bg-black bg-opacity-50 '
        onClick={closeModal}>
        <div className='bg-white p-2 rounded shadow-lg w-56 max-h-[200px] overflow-y-auto mt-16 ml-16'>
          <div className='relative'>
            <input
              type='text'
              value={filterSearch}
              onChange={handleSearchChange}
              className='p-2 pr-10 pl-4 border border-gray-300 rounded w-full mb-4'
            />
            <SearchIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500' />
          </div>
          <ul>
            {initialColumns
              .filter((col) =>
                col.toLowerCase().includes(filterSearch.toLowerCase())
              )
              .map((col, index) => (
                <li
                  key={index}
                  className='flex justify-start items-center p-2'>
                  <input
                    type='checkbox'
                    checked={columns.includes(col)}
                    onChange={(e) => handleColumnToggle(col, e.target.checked)}
                    className='mr-2'
                  />
                  <span>{col}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default FilterModal;
