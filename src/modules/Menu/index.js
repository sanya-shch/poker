import React, { lazy, Suspense, useState } from "react";

import CombinationBlock from "./CombinationBlock";
import MenuNavigation from "./MenuNavigation";
// import SettingsBlock from "./SettingsBlock";
import UsersBlock from "./UsersBlock";
import HistoryBlock from "./HistoryBlock";
import MessagesBlock from "./MessagesBlock";

import "./style.scss";

const SettingsBlock = lazy(() => import("./SettingsBlock"));

const Menu = ({
  open,
  setOpen,
  id,
  uuid,
  isHost,
  ongoingGame,
  withBackgroundAnimation = false,
  playerDataArr,
  playersList,
  dealerUid,
  messagesList,
  historyList,
}) => {
  const [activeItem, setActiveItem] = useState("command");

  return (
    <div
      className={`menu ${open ? "menu_active" : ""} ${
        isHost && ongoingGame ? "" : "big_block"
      }`}
    >
      <button
        className={`fancy-burger ${open ? "" : "not_active"}`}
        onClick={() => setOpen(!open)}
      >
        <span
          className={`rectangle rectangle--top rectangle--small ${
            open ? "open" : ""
          }`}
        />
        <span className={`rectangle rectangle--middle ${open ? "open" : ""}`} />
        <span
          className={`rectangle rectangle--bottom rectangle--small ${
            open ? "open" : ""
          }`}
        />
      </button>

      <div className="menu_list">
        {activeItem === "command" ? (
          <CombinationBlock />
        ) : activeItem === "users" ? (
          <UsersBlock
            playerDataArr={playerDataArr}
            playersList={playersList}
            uuid={uuid}
            ongoingGame={ongoingGame}
            dealerUid={dealerUid}
          />
        ) : activeItem === "history" ? (
          <HistoryBlock
            historyList={historyList}
            playerDataArr={playerDataArr}
          />
        ) : activeItem === "messages" ? (
          <MessagesBlock
            messagesList={messagesList}
            id={id}
            uuid={uuid}
            playerDataArr={playerDataArr}
            playersList={playersList}
            ongoingGame={ongoingGame}
          />
        ) : activeItem === "settings" ? (
          <Suspense>
            <SettingsBlock
              isHost={isHost}
              withBackgroundAnimation={withBackgroundAnimation}
              id={id}
              ongoingGame={ongoingGame}
              uuid={uuid}
            />
          </Suspense>
        ) : null}

        <MenuNavigation activeItem={activeItem} setActiveItem={setActiveItem} />
      </div>
    </div>
  );
};

export default Menu;
