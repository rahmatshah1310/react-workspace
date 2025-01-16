/** @format */

import React, { useState } from "react";
import {
  FilterIcon,
  ThreeDots,
  SortedSvg,
  PaperClip,
  SelectIcon,
  LessThan,
  GreaterThan,
} from "../../assets/icons/Icons";
import { columns as initialColumns, data } from "../constant/Constant";
import FilterModal from "../modal/FilterModal";
import SortedModal from "../modal/SortedModal";
import DeleteModal from "../modal/DeleteModal";

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
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const currentRows = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // <--------------------- Sorting logic ------------------------>
  const handleSort = (columnName) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a[columnName] < b[columnName]) return -1;
      if (a[columnName] > b[columnName]) return 1;
      return 0;
    });
    setSortedColumn(columnName);
    setSortedData(sorted);
  };

  // <-------------------- OPEN AND CLOSE MODALS LOGIC -------------------------->
  const handleFilterClick = () => {
    setShowFilterModal(true);
  };
  const openSortModal = (columnName, index) => {
    const uniqueValues = [...new Set(data.map((item) => item[columnName]))];
    setModalData(uniqueValues);
    setShowSortedModal(showSortedModal === index ? null : index); // Open the sorted modal
  };
  const closeModal = () => {
    setShowFilterModal(false);
    setShowSortedModal(false);
  };

  // <-------------------- OPEN AND CLOSE MODALS FILTER LOGIC -------------------------->
  const openFilterModal = (columnName) => {
    const uniqueValues = [...new Set(data.map((item) => item[columnName]))];
    setModalData(uniqueValues);
    setSortedColumn(columnName);
    setShowSortedModal(true);
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
    const columnIndex = initialColumns.indexOf(columnName);

    if (checked) {
      const updatedColumns = [...columns];
      updatedColumns.splice(columnIndex, 0, columnName);
      setColumns(updatedColumns);
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
  // <--------------------- For Selecting all checkbox on One ------------------------->
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
  // <--------------------- For Selecting all checkbox individually ------------------------->
  const handleRowSelection = (id, checked) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true); // Set the index of the icon
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false); // Close the modal
  };
  return (
    <section className='p-4 '>
      <div className=' overflow-y-auto'>
        <div className='relative  shadow-md sm:rounded-lg'>
          <table className='w-full border-collapse border rounded-lg border-gray-300 table-fixed'>
            <thead className='overflow-x-hidden'>
              <tr className='bg-blue-700'>
                <th className='bg-blue-700 border border-gray-300 px-4 py-2 text-left w-[50px] sticky left-0 '>
                  <input
                    type='checkbox'
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={currentRows.every((row) =>
                      selectedRows.includes(row.id)
                    )}
                  />
                </th>

                <th className='bg-blue-700 border border-gray-300 px-4 py-2 w-[80px] sticky left-[50px] '>
                  <button onClick={handleFilterClick}>
                    <FilterIcon className='w-6 h-6 text-white relative' />
                  </button>
                </th>

                {/* <-------------------------- Draggable Headers ------------------------>  */}
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className='border border-gray-300 px-4 py-2 text-white w-[150px]'
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index)}
                    style={{ cursor: "move" }}>
                    <div className='flex items-center justify-between'>
                      <span onClick={() => handleSort(col)}> {col}</span>
                      <div className='flex items-center space-x-2'>
                        {/* <---------------- Logic for SelectIcon -------------------> */}
                        {(col === "Station" ||
                          col === "Division" ||
                          col === "Reg No" ||
                          col === "Full Name" ||
                          col === "Duty") && (
                          <SelectIcon className='ml-2 w-4 h-4 text-white cursor-pointer' />
                        )}

                        {/* <------------------------- Logic for Filter and Sort Icons ---------------------> */}
                        {col === "Station" && (
                          <button
                            onClick={() => openFilterModal(col, index)}
                            className='ml-2'>
                            <SortedSvg className='w-4 h-4 relative' />
                          </button>
                        )}
                        {col === "Division" && (
                          <button
                            onClick={() => handleSort(col)}
                            className='ml-2'>
                            <SortedSvg className='w-4 h-4 relative' />
                          </button>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, id) => (
                <tr key={row.id}>
                  <td className='left-0 bg-gray-100 border border-gray-300 px-4 py-2 w-[50px] sticky z-1'>
                    <input
                      type='checkbox'
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) =>
                        handleRowSelection(row.id, e.target.checked)
                      }
                    />
                  </td>

                  <td className='left-[50px] bg-gray-100 border border-gray-300 px-4 py-2 w-[80px] sticky z-1'>
                    <div className='flex'>
                      <PaperClip className='w-4 h-4 text-blue-700' />
                      <ThreeDots
                        className='w-4 h-4 cursor-pointer text-gray-500'
                        onClick={() => handleOpenDeleteModal(id)}
                      />
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
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          <LessThan className='w-4 h-4 font-bold' />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-2 rounded ${
              currentPage === index + 1
                ? "border border-blue-500 text-gray-600"
                : "border border-blue-500"
            }`}>
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }>
          <GreaterThan className='w-4 h-4 font-bold' />
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
      <FilterModal
        showModal={showFilterModal}
        filterSearch={filterSearch}
        setFilterSearch={setFilterSearch}
        columns={columns}
        initialColumns={initialColumns}
        handleColumnToggle={handleColumnToggle}
        closeModal={closeModal}
        placement='bottom'
      />
      <DeleteModal
        isOpen={openDeleteModal}
        handleClose={handleCloseDeleteModal}
      />
    </section>
  );
};
export default PaginatedTable;
