/** @format */

import React, { useState } from "react";
import { FilterIcon, ThreeDots, SortedSvg } from "../../assets/icons/Icons";
import { columns as initialColumns, data } from "../constant/Constant";
import FilterModal from "../modal/FilterModal";
import SortedModal from "../modal/SortedModal";

const PaginatedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columns, setColumns] = useState([...new Set(initialColumns)]);
  const [showModal, setShowModal] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null); // Track the sorted column
  const [sortedData, setSortedData] = useState(data); // Store the sorted data
  const [modalData, setModalData] = useState([]); // Data to display in modal
  const [sortOrder, setSortOrder] = useState("asc"); // Track sorting order (asc/desc)
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

  // Function to handle sorting by column
  const handleSort = (columnName) => {
    const sortedArray = [...data]
      .filter((item) => item[columnName]) // Ensure the column has values
      .sort((a, b) => {
        const valA = a[columnName]?.toLowerCase() || "";
        const valB = b[columnName]?.toLowerCase() || "";
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });

    setSortedData(sortedArray);
    setSortedColumn(columnName);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
    setShowModal(false); // Close modal after sorting
  };

  // Function to open the modal with unique column values
  const openSortModal = (columnName) => {
    const uniqueValues = [...new Set(data.map((item) => item[columnName]))];
    setModalData(uniqueValues);
    setShowModal(true);
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

  const handleInputChange = (rowId, column, value) => {
    setSortedData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, [column]: value } : row
      )
    );
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
                    <FilterIcon className='w-6 h-6 text-white' />
                  </button>
                  <FilterModal
                    showModal={showModal}
                    filterSearch={filterSearch}
                    setFilterSearch={setFilterSearch}
                    columns={columns}
                    initialColumns={initialColumns}
                    handleColumnToggle={handleColumnToggle} // Add this line
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
                    style={{ cursor: "move" }}>
                    {col}
                    {(col === "Station" || col === "Division") && (
                      <button
                        onClick={() => openSortModal(col)}
                        className='ml-8'>
                        <SortedSvg className='w-4 h-4' />
                      </button>
                    )}
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
                      className={`border border-gray-300 px-4 py-2 w-[150px] ${
                        col === "Address"
                          ? "truncate overflow-hidden whitespace-nowrap text-ellipsis"
                          : ""
                      }`}>
                      {col === "Reg No" ? (
                        <span>
                          <input
                            type='text'
                            className='bg-transparent w-24 outlnie-none focus:outline-none'
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

      {/* <SortedModal
        showModal={showModal}
        sortedColumn={sortedColumn}
        modalData={modalData}
        handleSort={handleSort}
        closeModal={closeModal}
      /> */}
    </div>
  );
};

export default PaginatedTable;
