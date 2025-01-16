/** @format */

import React, { useState } from "react";
import { SearchIcon } from "../../assets/icons/Icons";

const FilterModal = ({
  showModal,
  closeModal,
  columns,
  initialColumns,
  handleColumnToggle,
}) => {
  const [filterSearch, setFilterSearch] = useState("");

  const handleSearchChange = (e) => {
    setFilterSearch(e.target.value);
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent closing the modal when clicking inside
  };

  return (
    showModal && (
      <div
        className='inset-0 model-overlay absolute '
        onClick={closeModal}>
        <div
          className='bg-white p-2 rounded shadow-lg w-56 h-44 overflow-y-auto absolute top-[13%] left-[5%] z-100'
          onClick={handleModalClick} // Attach the handler here
        >
          <div className='relative'>
            <input
              type='text'
              value={filterSearch}
              onChange={handleSearchChange}
              className='p-2 pr-10 pl-4 border border-gray-300 outline-none rounded w-full mb-4'
            />
            <SearchIcon className='absolute right-3 top-1/3 transform -translate-y-1/2 w-5 h-5 text-gray-500' />
          </div>
          <ul>
            {initialColumns
              .filter((col) =>
                col.toLowerCase().includes(filterSearch.toLowerCase())
              )
              .map((col, id) => (
                <li
                  key={id}
                  className='flex justify-start items-center p-2'>
                  <input
                    type='checkbox'
                    id={id}
                    checked={columns.includes(col)} // Use the columns prop
                    onChange={(e) => handleColumnToggle(col, e.target.checked)}
                    className='mr-2'
                  />
                  <label
                    htmlFor={id}
                    className='font-normal'>
                    {col}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default FilterModal;
