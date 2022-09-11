import React from "react";

import "./style.css";

const CircleTimer = () => {
  return (
    <div className="loader-container">
      <svg>
        <circle cx="15" cy="15" r="15" />
      </svg>
    </div>
  );
};

export default CircleTimer;
