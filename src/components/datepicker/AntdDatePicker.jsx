/** @format */

import React from "react";
import { DatePicker, Space } from "antd";

const AntdDatePicker = ({ picker, onChange, placement, className }) => (
  <Space direction='vertical'>
    <DatePicker
      onChange={onChange}
      picker={picker}
      placement={placement}
      className={className}
    />
  </Space>
);
export default AntdDatePicker;
