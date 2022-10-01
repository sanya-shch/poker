import React from "react";

import "./style.scss";

const Toggle = ({ text = "", onToggle, isToggle }) => {
  return (
    <label className="toggle_label">
      <div className="toggle">
        <input
          className="toggle-state"
          type="checkbox"
          name="check"
          value="check"
          onChange={onToggle}
          checked={isToggle}
        />
        <div className="indicator" />
      </div>
      <div className="label-text">{text}</div>
    </label>
  );
};

export default Toggle;
