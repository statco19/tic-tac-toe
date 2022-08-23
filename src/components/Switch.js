import React from "react";

const Switch = (props) => {
  const { isChecked, handleToggle } = props;

  return (
    <div className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
    </div>
  );
};

export default Switch;
