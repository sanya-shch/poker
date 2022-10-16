import React, { lazy, Suspense, useEffect, useState } from "react";

// import CombinationBlock from "./CombinationBlock";
// import MenuNavigation from "./MenuNavigation";
// import SettingsBlock from "./SettingsBlock";
// import UsersBlock from "./UsersBlock";
// import HistoryBlock from "./HistoryBlock";
// import MessagesBlock from "./MessagesBlock";

import "./style.scss";

const CombinationBlock = lazy(() => import("./CombinationBlock"));
const MenuNavigation = lazy(() => import("./MenuNavigation"));

const SettingsBlock = lazy(() => import("./SettingsBlock"));
const UsersBlock = lazy(() => import("./UsersBlock"));
const HistoryBlock = lazy(() => import("./HistoryBlock"));
const MessagesBlock = lazy(() => import("./MessagesBlock"));

let openInitial = false;

const Menu = ({
  open,
  setOpen,
  id,
  uuid,
  isHost,
  setIsHost,
  ongoingGame,
  withBackgroundAnimation = false,
  smallBlind,
  bigBlind,
  playerDataArr,
  playersList,
  dealerUid,
  messagesList,
  messagesLastUpdates,
  messagesInfo,
  historyList,
  setIsRenameModalOpen,
  setIsChangeIconModalOpen,
}) => {
  const [activeItem, setActiveItem] = useState("command");

  useEffect(() => {
    if (open && !openInitial) openInitial = true;
  }, [open]);

  return (
    <div
      className={`menu ${open ? "menu_active" : ""} ${
        isHost && ongoingGame ? "" : "big_block"
      }`}
    >
      <div
        id="menu-burger-btn"
        title=""
        role="button"
        tabIndex="-1"
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
        {messagesLastUpdates > messagesInfo?.[uuid]?.lastView && (
          <span className="messages" />
        )}
      </div>

      <div className="menu_list">
        {activeItem === "command" ? (
          <CombinationBlock />
        ) : activeItem === "users" ? (
          <Suspense>
            <UsersBlock
              playerDataArr={playerDataArr}
              playersList={playersList}
              uuid={uuid}
              ongoingGame={ongoingGame}
              dealerUid={dealerUid}
              id={id}
              isHost={isHost}
              setIsRenameModalOpen={setIsRenameModalOpen}
              setIsChangeIconModalOpen={setIsChangeIconModalOpen}
              setOpen={setOpen}
              smallBlind={smallBlind}
            />
          </Suspense>
        ) : activeItem === "history" ? (
          <Suspense>
            <HistoryBlock
              historyList={historyList}
              playerDataArr={playerDataArr}
            />
          </Suspense>
        ) : activeItem === "messages" ? (
          <Suspense>
            <MessagesBlock
              messagesList={messagesList}
              id={id}
              uuid={uuid}
              playerDataArr={playerDataArr}
              playersList={playersList}
              ongoingGame={ongoingGame}
              open={open}
              messagesLastUpdates={messagesLastUpdates}
              messagesInfo={messagesInfo}
            />
          </Suspense>
        ) : activeItem === "settings" ? (
          <Suspense>
            <SettingsBlock
              isHost={isHost}
              setIsHost={setIsHost}
              withBackgroundAnimation={withBackgroundAnimation}
              smallBlind={smallBlind}
              bigBlind={bigBlind}
              id={id}
              ongoingGame={ongoingGame}
              uuid={uuid}
              playerDataArr={playerDataArr}
            />
          </Suspense>
        ) : null}

        {(open || openInitial) && (
          <Suspense>
            <MenuNavigation
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Menu;
