import React from "react";

import { ReactComponent as CommandSvg } from "./command.svg";
import { ReactComponent as SettingsSvg } from "./settings.svg";
import { ReactComponent as ListSvg } from "./list.svg";
import { ReactComponent as MessageSquareSvg } from "./message-square.svg";
import { ReactComponent as UsersSvg } from "./users.svg";

import "./style.scss";

const MenuNavigation = ({ activeItem, setActiveItem }) => (
  <div className="menu_navigation">
    <div className="ul">
      <div
        className={`list ${activeItem === "command" ? "active" : ""}`}
        style={{ "--clr": "#f44" }}
      >
        <div className="item" onClick={() => setActiveItem("command")}>
          <span className="icon">
            <CommandSvg />
          </span>
        </div>
      </div>
      <div
        className={`list ${activeItem === "users" ? "active" : ""}`}
        style={{ "--clr": "#ffa117" }}
      >
        <div className="item" onClick={() => setActiveItem("users")}>
          <span className="icon">
            <UsersSvg />
          </span>
        </div>
      </div>
      <div
        className={`list ${activeItem === "history" ? "active" : ""}`}
        style={{ "--clr": "#0fc70f" }}
      >
        <div className="item" onClick={() => setActiveItem("history")}>
          <span className="icon">
            <ListSvg />
          </span>
        </div>
      </div>
      <div
        className={`list ${activeItem === "messages" ? "active" : ""}`}
        style={{ "--clr": "#2196f3" }}
      >
        <div className="item" onClick={() => setActiveItem("messages")}>
          <span className="icon">
            <MessageSquareSvg />
          </span>
        </div>
      </div>
      <div
        className={`list ${activeItem === "settings" ? "active" : ""}`}
        style={{ "--clr": "#b145e9" }}
      >
        <div className="item" onClick={() => setActiveItem("settings")}>
          <span className="icon">
            <SettingsSvg />
          </span>
        </div>
      </div>
      <div className="menu_indicator" />
    </div>
  </div>
);

export default MenuNavigation;
