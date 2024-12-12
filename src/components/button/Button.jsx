/** @format */

import React from "react";

const Button = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className='bg-blue-600 text-white py-2 px-4 rounded-xl'>
      {title}
    </button>
  );
};

export default Button;
