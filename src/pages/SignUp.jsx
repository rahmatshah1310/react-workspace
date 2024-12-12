/** @format */

import React, { useState } from "react";
import AntdDrawer from "../components/drawer/AntdDrawer";
import Button from "../components/button/Button";
import InputField from "../components/inputfield/InputField";
import AntdSelectField from "../components/selectfield/AntdSelectField";
import { options } from "../components/constant/Constant";
import { items } from "../components/constant/Constant";
import AntdDropDown from "../components/dropdown/AntDropDown";
import AntdDatePicker from "../components/datepicker/AntdDatePicker";
import AntdTable from "../components/table/AntdTable";
import { columns } from "../components/constant/Constant";
import { dataSource } from "../components/constant/Constant";
import AntdDivider from "../components/divider/AntdDivider";

const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [email, setEmail] = useState("");
  const onClose = () => {
    setIsOpen(false);
  };

  const isVisible = () => {
    setIsOpen(true);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* <------------------------- Drawer Component ------------------------------> */}
        <AntdDrawer
          title='Basic Drawer'
          placement='top'
          isVisible={isOpen}
          onClose={onClose}
          onChange={(e) => setPlacement(e.target.value)}>
          {/* <------------------------- InputField Component ------------------------------> */}
          <InputField
            placeholder='email'
            label='Label'
            onChange={(e) => setEmail(e.target.value)}
            value='email'
          />
          {/* <------------------------- Select Component------------------------------> */}
          <AntdSelectField
            handleChange={handleChange}
            placeholder='Select a value'
            options={options}
            className='w-96'
          />
          {/* <------------------------- DropDown Component ------------------------------> */}
          <AntdDropDown
            items={items}
            trigger='click'
            placement='bottom'
            title='Click to open'
            className='w-96 mx-4'
          />
          {/* <------------------------- DatePikcer Component ------------------------------> */}
          <AntdDatePicker
            handleChangeDate={handleChangeDate}
            picker='month'
            className='w-96 mx-4'
            placement='topLeft'
          />
          {/* <------------------------- Close Drawer ------------------------------> */}
          <Button
            onClick={onClose}
            title='Close'
          />
        </AntdDrawer>
      </form>
      {/* <------------------------- Open Drawer ------------------------------> */}
      <Button
        onClick={isVisible}
        title='Click to open drawer'
      />
      {/* <------------------------- Table Component ------------------------------> */}
      <AntdTable
        dataSource={dataSource}
        columns={columns}
      />
      <div className='w-96 mt-4 mx-auto space-y-3'>
        <div className='border border-black'>
          <AntdDivider
            orientation='left'
            text='Left'
            type='horizontal'
          />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Asperiores, iusto.
          </p>
        </div>
        <div className='border border-black'>
          <AntdDivider
            orientation='center'
            text='Center'
            type='horizontal'
          />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Asperiores, iusto.
          </p>
        </div>
        <div className='border border-black'>
          <AntdDivider
            orientation='right'
            text='Right'
            type='vertical'
          />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Asperiores, iusto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
