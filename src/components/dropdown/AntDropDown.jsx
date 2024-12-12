/** @format */

import React from "react";
import { Button, Dropdown, Space } from "antd";
const items = [
  {
    key: "1",
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.antgroup.com'>
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.aliyun.com'>
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.luohanacademy.com'>
        3rd menu item
      </a>
    ),
  },
];
const AntdDropDown = ({ trigger, placement, items, title, className }) => (
  <Space direction='vertical'>
    <Space>
      <Dropdown
        menu={{
          items,
        }}
        placement={placement}
        trigger={trigger}
        className={className}>
        <Button>{title}</Button>
      </Dropdown>
    </Space>
  </Space>
);
export default AntdDropDown;
