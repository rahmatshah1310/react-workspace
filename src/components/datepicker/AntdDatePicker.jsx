/** @format */

import React from "react";
import { DatePicker, Space } from "antd";

const AntdDatePicker = ({
  picker,
  onChange,
  placement,
  className,
  onClick,
}) => (
  <Space direction='vertical'>
    <DatePicker
      onChange={onChange}
      onClick={onClick}
      picker={picker}
      placement={placement}
      className={className}
    />
  </Space>
);
export default AntdDatePicker;
