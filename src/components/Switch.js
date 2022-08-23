import React from "react";

const Switch = (props) => {
  const { isChecked, handleToggle } = props;

  return (
    <div className="switch">
      <input
        type="checkbox"
        className={`switch-checkbox`}
        checked={isChecked}
        onChange={handleToggle}
        id={`switch-input`}
      />
      <label className={`switch-label`} htmlFor={`switch-input`}>
        <div className="ball" />
      </label>
    </div>
  );
};

export default Switch;
