/** @format */

import React from "react";
import { Divider } from "antd";
const AntdDivider = ({
  orientation,
  text,
  type,
  className,
  orientationMargin,
}) => {
  return (
    <Divider
      type={type}
      orientation={orientation}
      className={className}>
      {text}
    </Divider>
  );
};

export default AntdDivider;
