import React from "react";

const Switch = (props) => {
  const { isChecked, handleToggle } = props;

  const active = {
    backgroundColor: "green",
  };

  const inactive = {
    backgroundColor: "gray",
  };

  return (
    <div className="switch" style={isChecked === true ? active : inactive}>
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
