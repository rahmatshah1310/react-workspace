/** @format */

import React from "react";
import {
  FileTransfer,
  PaperclipPin,
  PrinterLabel,
  PrintLabel,
  SelectIcon,
  TrashIcon,
  UserSlash,
  ViewEye,
} from "../../assets/icons/Icons";

const IconData = [
  { icon: <TrashIcon className='w-4 h-4 text-black' />, text: "Delete" },
  { icon: <PaperclipPin className='w-4 h-4 text-black' />, text: "Attach" },
  { icon: <ViewEye className='w-4 h-4 text-black' />, text: "View" },
  {
    icon: <PrinterLabel className='w-4 h-4 text-black' />,
    text: "Print Label",
  },
  {
    icon: <FileTransfer className='w-4 h-4 text-black' />,
    text: "Transfer Requests",
  },
  { icon: <UserSlash className='w-4 h-4 text-black' />, text: "Career Break" },
];

const DeleteModal = ({ isOpen, handleClose }) => {
  return (
    isOpen && (
      <div
        className='modal-overlay absolute inset-0 '
        onClick={handleClose}>
        <div
          className='bg-white p-4 rounded shadow-lg w-56 max-h-60 mt-24 ml-24 overflow-y-auto '
          onClick={(e) => e.stopPropagation()} // Prevents modal close on inner clicks
        >
          <div className='space-y-2'>
            {IconData.map((item, index) => (
              <div
                key={index}
                className='flex items-center space-x-2'>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteModal;
