/** @format */

import React, { useState } from "react";
import { Button, Modal } from "antd";
import AntdDatePicker from "../datepicker/AntdDatePicker";
import AntdSelectField from "../selectfield/AntdSelectField";
import {
  optionItems,
  WeekData,
  radioOptionsMonth,
  radioOptionsYear,
  daySelector,
} from "../constant/Constant";

const AntdModal = ({ openModal, showModal, closeModal, title }) => {
  const selectArray = Array.from({ length: 20 }, (_, item) => ({
    id: item + 1,
    label: `Repeat every ${item + 1}`,
  }));

  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [endDate, setEndDate] = useState(null);

  // Map label to full day names
  const getFullDayFromLabel = (label) => {
    const index = WeekData.indexOf(label);
    return daySelector[index];
  };

  const toggleDay = (dayLabel) => {
    const fullDay = getFullDayFromLabel(dayLabel);

    setSelectedDays((prev) =>
      prev.includes(fullDay)
        ? prev.filter((day) => day !== fullDay)
        : [...prev, fullDay]
    );
  };

  const getFormattedDaysText = () => {
    return `Occurs every ${selectedDays.join(", ")}`;
  };

  const handleSelectChange = (label) => {
    setSelectedLabel(label);
  };

  const handleButtonClick = () => {
    setEndDate(null); // Remove the date
  };

  const handleDateChange = (date) => {
    setEndDate(date); // Update the date
  };

  return (
    <Modal
      title={title}
      footer={
        <div className='flex justify-center items-end mb-auto space-x-2'>
          <Button type='primary'>Save</Button>
          <Button onClick={closeModal}>Discard</Button>
          <Button>Remove</Button>
        </div>
      }
      open={openModal}
      onCancel={closeModal}>
      {/*<------------------------- Start Date --------------------------> */}
      <div className='flex items-end mt-5 gap-3'>
        <p>Start</p>
        <AntdDatePicker className='border-0 border-b-2 border-[#8C8C8C] rounded-none' />
      </div>

      {/*<------------------- Select Fields ------------------------> */}
      <div className='w-80 mx-auto flex items-start space-x-3 mt-8 py-2'>
        <AntdSelectField
          optionItems={selectArray}
          onSelectChange={handleSelectChange}
          className='w-full outline-none cursor-pointer'
        />
        <AntdSelectField
          className='w-full outline-none cursor-pointer'
          optionItems={optionItems}
          onSelectChange={handleSelectChange}
        />
      </div>

      {/*<------------------- Dynamic Content Based on Selected Label -----------------------> */}
      {selectedLabel && (
        <div className='mt-4'>
          {selectedLabel === "Day" && (
            <div className='w-80 flex gap-3 mx-auto '>
              {WeekData.map((item, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={() => toggleDay(item)}
                  className={`w-8 h-8 border rounded ${
                    selectedDays.includes(getFullDayFromLabel(item))
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}>
                  {item.label}
                </button>
              ))}
            </div>
          )}
          {selectedLabel === "Month" && (
            <div className='w-80 mx-auto flex flex-col gap-3 justify-center '>
              {radioOptionsMonth.map((item, index) => (
                <div
                  key={index}
                  className='flex gap-1 items-center'>
                  <input
                    type='radio'
                    name='month'
                    value={item.label}
                  />
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className='w-80 mx-auto mt-2 text-gray-700'>
        <p>{getFormattedDaysText()}</p>
      </div>

      {/*<--------------------- End Date Picker and Button --------------------------> */}
      <div className='flex justify-center my-3 gap-8'>
        <AntdDatePicker
          className='border-0'
          picker='Select end date'
          onChange={handleDateChange} // Call on date change
        />
        {endDate && (
          <button onClick={handleButtonClick}>Remove End Date</button>
        )}
      </div>
    </Modal>
  );
};

export default AntdModal;
