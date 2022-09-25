import React from "react";
import { useNavigate } from "react-router-dom";

// import * as icons from "../../assets/playerIcons";
// import Tooltip from "../../components/Tooltip";

import "./style.scss";

const Header = ({ playerDataArr, isOpen, setOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h1 onClick={() => navigate("/")} tabIndex={0} role="button">
        POKER
      </h1>

      {/*<div className="words">*/}
      {/*  <span>P</span>*/}
      {/*  <span>O</span>*/}
      {/*  <span>K</span>*/}
      {/*  <span>E</span>*/}
      {/*  <span>R</span>*/}
      {/*</div>*/}

      {/*<div className="players">*/}
      {/*  {playerDataArr?.map((player) => (*/}
      {/*    <Tooltip*/}
      {/*      key={player.uid}*/}
      {/*      text={`${player.username} - ${player.points}`}*/}
      {/*    >*/}
      {/*      <img*/}
      {/*        src={icons[player.icon_index]}*/}
      {/*        alt=""*/}
      {/*        width="40px"*/}
      {/*        height="40px"*/}
      {/*      />*/}
      {/*    </Tooltip>*/}
      {/*  ))}*/}
      {/*</div>*/}

      <button className="fancy-burger" onClick={() => setOpen(!isOpen)}>
        <span className="rectangle rectangle--top rectangle--small" />
        <span className="rectangle rectangle--middle" />
        <span className="rectangle rectangle--bottom rectangle--small" />
      </button>
    </div>
  );
};

export default Header;
