import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const Header = ({ isOpen, setOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h1 onClick={() => navigate("/")} tabIndex={0} role="button">
        POKER
      </h1>

      <button className="fancy-burger" onClick={() => setOpen(!isOpen)}>
        <span className="rectangle rectangle--top rectangle--small" />
        <span className="rectangle rectangle--middle" />
        <span className="rectangle rectangle--bottom rectangle--small" />
      </button>
    </div>
  );
};

export default Header;
