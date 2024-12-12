/** @format */

import React from "react";
import { Select, Space } from "antd";

const AntdSelectField = ({ handleChange, placeholder, options, className }) => (
  <Space>
    <Select
      className={className}
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
    />
  </Space>
);
export default AntdSelectField;
