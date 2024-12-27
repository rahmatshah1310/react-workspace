/** @format */

import React from "react";

const AntdSelectField = ({
  className,
  optionItems,
  onSelectChange,
  option,
}) => {
  const handleChange = (event) => {
    const selectedLabel = event.target.value;
    onSelectChange(selectedLabel);
  };

  return (
    <div>
      <select
        className={className}
        onChange={handleChange}>
        {optionItems.map((item, id) => (
          <option
            className='cursor-pointer'
            key={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AntdSelectField;
