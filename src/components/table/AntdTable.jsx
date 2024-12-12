/** @format */
import React from "react";
import { Table } from "antd";
const AntdTable = ({ dataSource, columns }) => {
  return (
    <Table
      className='border border-black mt-4'
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default AntdTable;
