/** @format */

import React from "react";
import { Input } from "antd";
const InputField = ({ placeholder, value, type, onChange, label }) => (
  <div className='my-3'>
    <label>{label}</label>
    <Input
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
    />
  </div>
);
export default InputField;
