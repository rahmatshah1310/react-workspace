/** @format */

import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import AntdDatePicker from "../datepicker/AntdDatePicker";
import AntdSelectField from "../selectfield/AntdSelectField";
import {
  optionItems,
  WeekData,
  radioOptionsMonth,
  radioOptionsYear,
  daySelector,
  monthSelector,
  yearSelector,
} from "../constant/Constant";

const AntdModal = ({ openModal, showModal, closeModal, title }) => {
  const selectArray = Array.from({ length: 20 }, (_, item) => ({
    id: item + 1,
    label: `Repeat every ${item + 1}`,
  }));

  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [endDate, setEndDate] = useState(null);

  /*<------------------------------- Save Data To LocalStorage ------------------------------->*/
  const saveToLocalStorage = () => {
    const data = {
      selectedLabel,
      selectedDays,
      selectedWeeks,
      selectedMonth,
      selectedYear,
      endDate,
    };
    localStorage.setItem("modalData", JSON.stringify(data));
    alert("Data store to localstorage");
  };

  useEffect(() => {
    const saveData = localStorage.getItem("modalData");
    if (saveData) {
      const parsedData = JSON.parse(saveData);
      setSelectedLabel(parsedData.selectedLabel);
      setSelectedDays(parsedData.selectedDays);
      setSelectedWeeks(parsedData.selectedWeeks);
      setSelectedMonth(parsedData.selectedMonth);
      setSelectedYear(parsedData.selectedYear);
      setEndDate(parsedData.endDate);
    }
  }, []);

  const handleSaveClick = () => {
    saveToLocalStorage();
  };
  /*<------------------------------- Save Data To LocalStorage ------------------------------->*/

  /*<------------------------- Logic For  Days --------------------------> */
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
  /*<------------------------- Logic For  Days --------------------------> */

  /*<------------------------- Logic For  Week --------------------------> */
  const getFullWeek = (label) => {
    const index = WeekData.indexOf(label);
    return daySelector[index];
  };

  const toggleWeek = (dayLabel) => {
    const fullWeek = getFullWeek(dayLabel);

    setSelectedWeeks((prev) =>
      prev.includes(fullWeek)
        ? prev.filter((day) => day !== fullWeek)
        : [...prev, fullWeek]
    );
  };

  const getFormattedWeek = () => {
    return `Occurs every ${selectedWeeks.join(", ")}`;
  };
  /*<------------------------- Logic For  Week --------------------------> */

  /*<------------------------- Logic For  Month --------------------------> */
  const getFullMonth = (label) => {
    const index = radioOptionsMonth.indexOf(label);
    return monthSelector[index];
  };

  const toggleMonth = (monthLabel) => {
    const fullMonth = getFullMonth(monthLabel);

    setSelectedMonth(
      (prev) => prev.filter((month) => month === fullMonth) && [fullMonth]
    );
  };

  const getFormattedMonth = () => {
    return `Occurs every ${selectedMonth.join()} until`;
  };
  /*<------------------------- Logic For  Month --------------------------> */

  /*<------------------------- Logic For  Year --------------------------> */
  const getFullYear = (label) => {
    const index = radioOptionsYear.indexOf(label);
    return yearSelector[index];
  };

  const toggleYear = (yearLabel) => {
    const fullYear = getFullYear(yearLabel);

    setSelectedYear(
      (prev) => prev.filter((year) => year === fullYear) && [fullYear]
    );
  };

  const getFormattedYear = () => {
    return `Occurs every year ${selectedYear.join()}`;
  };
  /*<------------------------- Logic For  Year --------------------------> */

  /*<------------------------- Logic For  Select --------------------------> */
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
          <Button
            type='primary'
            onClick={handleSaveClick}>
            Save
          </Button>
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
          {/*<--------------------- Section For Days --------------------------> */}
          <section>
            {selectedLabel === "day" && (
              <div className='w-80 mx-auto'>
                <div className='flex gap-3'>
                  {WeekData.map((item, index) => (
                    <button
                      key={index}
                      type='button'
                      onClick={() => toggleDay(item)}
                      className={`w-8 h-8 border ${
                        selectedDays.includes(getFullDayFromLabel(item))
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}>
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className='w-80 mx-auto mt-2 text-gray-700'>
                  <p>{getFormattedDaysText()}</p>
                </div>
              </div>
            )}
          </section>

          {/*<--------------------- Section For Weeks --------------------------> */}
          <section>
            {selectedLabel === "week" && (
              <div className='w-80 mx-auto'>
                <div className='flex gap-3'>
                  {WeekData.map((item, index) => (
                    <button
                      key={index}
                      type='button'
                      onClick={() => toggleWeek(item)}
                      className={`w-8 h-8 border ${
                        selectedWeeks.includes(getFullWeek(item))
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}>
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className='w-80 mx-auto mt-2 text-gray-700'>
                  <p>{getFormattedWeek()}</p>
                </div>
              </div>
            )}
          </section>

          {/*<--------------------- Section For Months --------------------------> */}
          <section>
            {selectedLabel === "month" && (
              <div className='w-80 mx-auto flex flex-col gap-3 justify-center '>
                {radioOptionsMonth.map((item, index) => (
                  <div
                    key={index}
                    className='flex gap-1 items-center'>
                    <input
                      onClick={() => toggleMonth(item)}
                      className='w-5 h-5'
                      id={index}
                      type='radio'
                      name='month'
                      value={item.label}
                    />
                    <label
                      htmlFor={index}
                      className='cursor-pointer'>
                      {item.label}
                    </label>
                  </div>
                ))}
                <div className='w-80 mx-auto mt-2 text-gray-700'>
                  <p>{getFormattedMonth()}</p>
                </div>
              </div>
            )}
          </section>

          {/*<--------------------- Section For Year --------------------------> */}
          <section>
            {selectedLabel === "year" && (
              <div className='w-80 mx-auto flex flex-col gap-3 justify-center '>
                {radioOptionsYear.map((item, index) => (
                  <div
                    key={index}
                    className='flex gap-1 items-center'>
                    <input
                      onClick={() => toggleYear(item)}
                      id={index}
                      className='w-5 h-5'
                      type='radio'
                      name='month'
                      value={item.label}
                    />
                    <label
                      htmlFor={index}
                      className='cursor-pointer'>
                      {item.label}
                    </label>
                  </div>
                ))}
                <div className='w-80 mx-auto mt-2 text-gray-700'>
                  <p>{getFormattedYear()}</p>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/*<--------------------- End Date Picker and Button --------------------------> */}
      <div className='flex justify-center my-3 gap-8'>
        <AntdDatePicker
          className='border-0 '
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
