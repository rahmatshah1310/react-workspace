/** @format */

import React, { useState } from "react";
import { FilterIcon, ThreeDots } from "../../assets/icons/Icons";
import { columns as initialColumns, data } from "../constant/Constant";
import FilterModal from "../modal/FilterModal";

const PaginatedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columns, setColumns] = useState([...new Set(initialColumns)]);
  const [showModal, setShowModal] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [editingRegNo, setEditingRegNo] = useState(null);
  const [editedRegNoValue, setEditedRegNoValue] = useState("");
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentRows = data.slice(
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

  const handleFilterClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFilterSearch("");
  };

  const handleColumnToggle = (columnName, checked) => {
    if (checked) {
      setColumns((prev) => [...prev, columnName]);
    } else {
      setColumns((prev) => prev.filter((col) => col !== columnName));
    }
  };

  const handleEditRegNo = (id, currentValue) => {
    setEditingRegNo(id);
    setEditedRegNoValue(currentValue);
  };

  const handleSaveRegNo = () => {
    const updatedRows = currentRows.map((row) =>
      row.id === editingRegNo ? { ...row, regNo: editedRegNoValue } : row
    );
    setEditingRegNo(null);
    setEditedRegNoValue("");
    console.log(updatedRows);
  };

  // Drag and Drop Logic
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className='p-4'>
      <div className='h-[400px] overflow-y-auto'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full border-collapse border rounded-lg border-gray-300 table-fixed'>
            <thead>
              <tr className='bg-blue-700'>
                <th className='border border-gray-300 px-4 py-2 text-left w-[50px]'>
                  <input
                    type='checkbox'
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={currentRows.every((row) =>
                      selectedRows.includes(row.id)
                    )}
                  />
                </th>
                <th className='border border-gray-300 px-4 py-2 text-left w-[80px] '>
                  <button onClick={handleFilterClick}>
                    <FilterIcon />
                  </button>
                  <FilterModal
                    showModal={showModal}
                    filterSearch={filterSearch}
                    setFilterSearch={setFilterSearch}
                    columns={columns}
                    initialColumns={initialColumns}
                    handleColumnToggle={handleColumnToggle}
                    closeModal={closeModal}
                  />
                </th>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className='border border-gray-300 px-4 py-2 text-white text-left w-[150px]'
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    style={{ cursor: "move" }} // Added cursor style for drag-and-drop
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr
                  key={row.id}
                  className='hover:bg-gray-100'>
                  <td className='border border-gray-300 px-4 py-2 w-[150px]'>
                    <input
                      type='checkbox'
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) =>
                        handleRowSelection(row.id, e.target.checked)
                      }
                    />
                  </td>
                  <td className='border border-gray-300 px-4 py-2 w-[150px]'>
                    <button>
                      <ThreeDots className='w-4 h-4 text-black' />
                    </button>
                  </td>
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border border-gray-300 px-4 py-2 w-[70px] ${
                        col === "address" ? "truncate" : ""
                      }`}>
                      {col === "regNo" ? (
                        editingRegNo === row.id ? (
                          <div className='flex items-center space-x-2'>
                            <input
                              type='text'
                              value={editedRegNoValue}
                              onChange={(e) =>
                                setEditedRegNoValue(e.target.value)
                              }
                              className='border border-gray-300 px-2 py-1 rounded'
                            />
                            <button
                              onClick={handleSaveRegNo}
                              className='bg-blue-500 text-white px-2 py-1 rounded'>
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className='flex items-center space-x-2'>
                            <span>{row.regNo}</span>
                            <button
                              onClick={() => handleEditRegNo(row.id, row.regNo)}
                              className='text-blue-500'>
                              Edit
                            </button>
                          </div>
                        )
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
    </div>
  );
};

export default PaginatedTable;
