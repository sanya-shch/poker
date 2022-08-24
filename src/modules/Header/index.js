import React from "react";
import { useNavigate } from "react-router-dom";

import * as icons from "../../assets/playerIcons";
import Tooltip from "../../components/Tooltip";

import "./style.scss";

const Header = ({ playerDataArr }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h1 onClick={() => navigate("/")} tabIndex={0} role="button">
        POKER
      </h1>

      <div className="players">
        {playerDataArr?.map((player) => (
          <Tooltip
            key={player.uid}
            text={`${player.username} - ${player.points}`}
          >
            <img
              src={icons[player.icon_index]}
              alt=""
              width="40px"
              height="40px"
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default Header;
