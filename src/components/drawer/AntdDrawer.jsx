/** @format */

import { Drawer } from "antd";
const AntdDrawer = ({ title, isVisible, onClose, children, placement }) => {
  return (
    <>
      <Drawer
        title={title}
        placement={placement}
        closable={false}
        open={isVisible}
        onClose={onClose}
        key={placement}>
        {children}
      </Drawer>
    </>
  );
};
export default AntdDrawer;
