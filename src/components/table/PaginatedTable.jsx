/** @format */

import React, { useState } from "react";
import { SelectIcon, ThreeDots } from "../../assets/icons/Icons";
import { columns as initialColumns, data } from "../constant/Constant";

const PaginatedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [columns, setColumns] = useState(initialColumns);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const rowsPerPage = 10;
  const [draggedColumnIndex, setDraggedColumnIndex] = useState(null);

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

  const handleEditCellChange = (id, column, value) => {
    const rowIndex = data.findIndex((row) => row.id === id);
    if (rowIndex !== -1) {
      data[rowIndex][column] = value;
    }
  };

  const handleOptionsClick = (row) => {
    setModalContent(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleDragStart = (index) => {
    setDraggedColumnIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedColumnIndex === null || draggedColumnIndex === index) return;

    const reorderedColumns = [...columns];
    const [removed] = reorderedColumns.splice(draggedColumnIndex, 1);
    reorderedColumns.splice(index, 0, removed);
    setColumns(reorderedColumns);

    setDraggedColumnIndex(null);
  };

  // Define which column names should have the SelectIcon
  const columnsWithIcons = ["Full Name", "Rank", "District", "Address"];

  const renderColumnIcon = (colName) => {
    if (columnsWithIcons.includes(colName)) {
      return <SelectIcon className='w-6 h-6 ml-2' />;
    }
    return null;
  };

  return (
    <div className='p-4'>
      <div className='h-[500px] overflow-y-auto'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full border-collapse border rounded-lg border-gray-300 table-fixed'>
            <thead>
              <tr className='bg-blue-700'>
                {/* Checkbox Column */}
                <th className='border border-gray-300 px-4 py-2 text-left w-[50px]'>
                  <input
                    type='checkbox'
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={currentRows.every((row) =>
                      selectedRows.includes(row.id)
                    )}
                  />
                </th>
                {/* Options Column */}
                <th className='border border-gray-300 px-4 py-2 text-left w-[80px]'>
                  Options
                </th>
                {/* Other Columns */}
                {columns.map((col, index) => (
                  <th
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                    className='border border-gray-300 px-4 py-2 text-white text-left cursor-grab w-[150px] flex items-center justify-start'>
                    <span>{col}</span>
                    {renderColumnIcon(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr
                  key={row.id}
                  className='hover:bg-gray-100'>
                  {/* Checkbox Column */}
                  <td className='border border-gray-300 px-4 py-2 w-[50px]'>
                    <input
                      type='checkbox'
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) =>
                        handleRowSelection(row.id, e.target.checked)
                      }
                    />
                  </td>
                  {/* Options Column */}
                  <td className='border border-gray-300 px-4 py-2 w-[80px]'>
                    <button onClick={() => handleOptionsClick(row)}>
                      <ThreeDots className='w-4 h-4' />
                    </button>
                  </td>
                  {/* Other Columns */}
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border border-gray-300 px-4 py-2 w-[150px] ${
                        col === "Address" ? "truncate" : ""
                      }`}>
                      {col === "Reg No" ? (
                        <input
                          type='text'
                          value={row[col] || ""}
                          onChange={(e) =>
                            handleEditCellChange(row.id, col, e.target.value)
                          }
                          className='p-1 w-full outline-none hover:outline-none'
                        />
                      ) : col === "Address" ? (
                        <div
                          className='overflow-hidden whitespace-nowrap text-ellipsis'
                          style={{ maxWidth: "200px" }}
                          title={row[col]}>
                          {row[col]}
                        </div>
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
      {/* Pagination */}
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
      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-lg'>
            <h2 className='text-lg font-semibold mb-4'>Row Options</h2>
            <pre>{JSON.stringify(modalContent, null, 2)}</pre>
            <button
              onClick={closeModal}
              className='mt-4 px-4 py-2 bg-red-500 text-white rounded'>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedTable;
