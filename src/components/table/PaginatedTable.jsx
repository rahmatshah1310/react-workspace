/** @format */

import React, { useState } from "react";
import {
  FilterIcon,
  ThreeDots,
  SortedSvg,
  PaperClip,
  SelectIcon,
} from "../../assets/icons/Icons";
import { columns as initialColumns, data } from "../constant/Constant";
import FilterModal from "../modal/FilterModal";
import SortedModal from "../modal/SortedModal";

const PaginatedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columns, setColumns] = useState([...new Set(initialColumns)]);
  const [showModal, setShowModal] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortedData, setSortedData] = useState(data);
  const [modalData, setModalData] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortedModal, setShowSortedModal] = useState(false);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const currentRows = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSelectAll = (checked) => {
    if (checked) {
      const allCurrentRowIds = currentRows.map((row) => row.id);
      setSelectedRows([...new Set([...selectedRows, ...allCurrentRowIds])]);
    } else {
      const remainingRows = selectedRows.filter(
        (id) => !currentRows.map((row) => row.id).includes(id)
      );
      setSelectedRows(remainingRows);
    }
  };

  const handleRowSelection = (id, checked) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  // <-------------------- OPEN AND CLOSE MODALS LOGIC -------------------------->
  const handleFilterClick = () => {
    setShowFilterModal(true);
  };
  const openSortModal = (columnName) => {
    const uniqueValues = [...new Set(data.map((item) => item[columnName]))];
    setModalData(uniqueValues);
    setShowSortedModal(true); // Open the sorted modal
  };
  const closeModal = () => {
    setShowFilterModal(false);
    setShowSortedModal(false);
  };

  // <-------------------- OPEN AND CLOSE MODALS LOGIC -------------------------->

  const openFilterModal = (columnName) => {
    const uniqueValues = [...new Set(data.map((item) => item[columnName]))];
    setModalData(uniqueValues); // Populate modal with unique values for the column
    setSortedColumn(columnName); // Set the column being filtered
    setShowSortedModal(true); // Open the modal
  };

  const applyFilter = (selectedValues) => {
    if (sortedColumn) {
      const filteredData = data.filter((row) =>
        selectedValues.includes(row[sortedColumn])
      );
      setSortedData(filteredData);
    }
    closeModal();
  };

  const clearFilter = () => {
    setSortedData(data);
    setSortedColumn(null);
  };

  // <-------------------- ADD AND DELETE COLUMN ON CHECKBOX -------------------------->
  const handleColumnToggle = (columnName, checked) => {
    if (checked) {
      setColumns((prev) => [...prev, columnName]);
    } else {
      setColumns((prev) => prev.filter((col) => col !== columnName));
    }
  };

  // <-------------------------- FUNCTION FOR DRAG AND DROP --------------------------->
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedIndex", index);
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("draggedIndex");
    const updatedColumns = [...columns];
    const draggedColumn = updatedColumns.splice(draggedIndex, 1)[0];
    updatedColumns.splice(index, 0, draggedColumn);
    setColumns(updatedColumns);
  };

  const handleInputChange = (rowId, column, value) => {
    setSortedData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, [column]: value } : row
      )
    );
  };

  return (
    <section className='p-4'>
      <div className='h-[400px] overflow-y-auto'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full border-collapse border rounded-lg border-gray-300 table-fixed'>
            <thead>
              <tr className='bg-blue-700'>
                <th className='bg-blue-700 border border-gray-300 px-4 py-2 text-left w-[50px]'>
                  <input
                    type='checkbox'
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={currentRows.every((row) =>
                      selectedRows.includes(row.id)
                    )}
                  />
                </th>
                {/* Filter Modal Header */}
                <th className='bg-blue-700 border border-gray-300 px-4 py-2 w-[80px]'>
                  <button onClick={handleFilterClick}>
                    <div className='flex items-center justify-center'>
                      <FilterIcon className='w-6 h-6 text-white' />
                    </div>
                  </button>
                  <FilterModal
                    showModal={showFilterModal}
                    filterSearch={filterSearch}
                    setFilterSearch={setFilterSearch}
                    columns={columns}
                    initialColumns={initialColumns}
                    handleColumnToggle={handleColumnToggle}
                    closeModal={closeModal}
                  />
                </th>
                {/* Draggable Headers */}
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className='border border-gray-300 px-4 py-2 text-white w-[150px]'
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => handleDrop(e, index)}
                    style={{ cursor: "move" }}>
                    <div className='flex items-center justify-between'>
                      {col}
                      <div className='flex items-center space-x-2'>
                        {(col === "Station" ||
                          col === "Division" ||
                          col === "Reg No" ||
                          col === "Full Name" ||
                          col === "Duty") && (
                          <SelectIcon className='ml-2 w-4 h-4 text-white cursor-pointer' />
                        )}
                        {(col === "Station" || col === "Division") && (
                          <button
                            onClick={() => openFilterModal(col)}
                            className='ml-2 relative'>
                            <SortedSvg className='w-4 h-4' />
                          </button>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentRows.map((row) => (
                <tr
                  key={row.id}
                  className='hover:bg-gray-100'>
                  <td className='left-0 bg-white border border-gray-300 px-4 py-2 w-[150px]'>
                    <input
                      type='checkbox'
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) =>
                        handleRowSelection(row.id, e.target.checked)
                      }
                    />
                  </td>
                  <td className='left-[50px] bg-white border border-gray-300 px-4 py-2 w-[150px]'>
                    <div className='flex'>
                      <PaperClip className='w-4 h-4 text-blue-700' />
                      <ThreeDots className='w-4 h-4 text-black ' />
                    </div>
                  </td>
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border border-gray-300 px-4 py-2 w-[150px] ${
                        col === "Address"
                          ? "truncate overflow-hidden whitespace-nowrap text-ellipsis"
                          : ""
                      }`}>
                      {col === "Reg No" ? (
                        <span>
                          <input
                            type='text'
                            className='bg-transparent w-24 outline-none focus:outline-none'
                            value={row[col] || ""}
                            onChange={(e) =>
                              handleInputChange(row.id, col, e.target.value)
                            }
                          />
                          {row.regNo}
                        </span>
                      ) : (
                        row[col] || ""
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <-----------------------  PAGINATION --------------------------> */}
      <div className='mt-4 flex justify-end space-x-2'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className='px-4 py-2 bg-gray-200 rounded'>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}>
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className='px-4 py-2 bg-gray-200 rounded'>
          Next
        </button>
      </div>
      {/* <--------------------------- SORTED MODAL ------------------------> */}
      <SortedModal
        showModal={showSortedModal}
        modalData={modalData}
        applyFilter={applyFilter}
        clearFilter={clearFilter}
        closeModal={closeModal}
      />
    </section>
  );
};
export default PaginatedTable;
