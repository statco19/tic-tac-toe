import React from "react";

const Switch = (props) => {
  const { isChecked, handleToggle } = props;

  const active = {
    backgroundColor: "green",
  };

  const inactive = {
    backgroundColor: "gray",
  };

  const name = "Desc";

  return (
    <div className="toggleSwitch">
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
      <div className="switch">{name}</div>
    </div>
  );
};

export default Switch;
