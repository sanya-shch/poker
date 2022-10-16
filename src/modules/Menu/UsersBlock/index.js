import React, { useMemo } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

import { db } from "../../../firebase";
import icons from "../../../assets/playerIcons";
import { getNextPlayer } from "../../../helpers";

import "./style.scss";

const UsersBlock = ({
  playerDataArr,
  playersList,
  uuid,
  ongoingGame,
  dealerUid,
  id,
  isHost,
  setIsRenameModalOpen,
  setIsChangeIconModalOpen,
  setOpen,
  smallBlind = 25,
}) => {
  const players = useMemo(
    () =>
      playerDataArr.reduce((acc, item) => {
        if (!ongoingGame || playersList.includes(item.uid)) {
          acc[item.uid] = item;
        }

        return acc;
      }, {}),
    [playerDataArr, ongoingGame, playersList]
  );

  const handleBan = async (uid) => {
    await updateDoc(doc(db, "game_rooms_poker", id), {
      banned_player_uid: arrayUnion(uid),
      player_data_arr: playerDataArr.filter((player) => player.uid !== uid),
    });
  };

  const handleOut = async (uid) => {
    const player = playerDataArr.find((arr) => arr.uid === uid);

    const playersList = playerDataArr
      .filter((item) => item.money > smallBlind)
      .map((item) => item.uid);
    const newDealerUid = getNextPlayer(playersList, dealerUid);

    updateDoc(doc(db, "game_rooms_poker", id), {
      player_data_arr: arrayRemove(player),
      dealer_uid: player.uid === dealerUid ? newDealerUid : dealerUid,
    });
  };

  const handleRename = (uid) => {
    if (uid === uuid) {
      setOpen(false);
      setIsRenameModalOpen(true);
    }
  };
  const handleChangeIcon = (uid) => {
    if (uid === uuid) {
      setOpen(false);
      setIsChangeIconModalOpen(true);
    }
  };

  const handleDealer = async (uid) =>
    await updateDoc(doc(db, `game_rooms_poker/${id}`), {
      dealer_uid: uid,
    });

  let sourceElement = null;

  const setPlayersList = async (list) => {
    await updateDoc(doc(db, "game_rooms_poker", id), {
      player_data_arr: list,
    });
  };

  const handleDragStart = (event) => {
    event.target.style.opacity = 0.5;
    sourceElement = event.target;
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (event) => {
    event.target.classList.add("over");
  };

  const handleDragLeave = (event) => {
    event.target.classList.remove("over");
  };

  const handleDrop = (event) => {
    event.stopPropagation();

    if (sourceElement !== event.target) {
      const list = Object.values(players).filter(
        (item, index) => index.toString() !== sourceElement.id
      );

      const removed = Object.values(players)[sourceElement.id];

      let insertAt = Number(event.target.id);

      let tempList = [];

      if (insertAt >= list.length) {
        tempList = list.slice(0).concat(removed);

        setPlayersList(tempList);

        event.target.classList.remove("over");
      } else if (insertAt < list.length) {
        tempList = list.slice(0, insertAt).concat(removed);

        const newList = tempList.concat(list.slice(insertAt));

        setPlayersList(newList);
        event.target.classList.remove("over");
      }
    } else console.log("nothing happened");
    event.target.classList.remove("over");
  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = 1;
  };

  if (Object.values(players)?.length === 0) return null;

  return (
    <div className="menu_users_block">
      <h4>Players</h4>

      <div className="custom_scrollbar container">
        {Object.values(players).map((player, index) => (
          <div
            key={player?.uid}
            className={`player_item ${
              isHost && !ongoingGame ? "dnd-list" : ""
            } ${player?.uid === uuid ? "current" : ""}`}
            draggable={isHost && !ongoingGame}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            id={index}
          >
            <img
              src={icons?.[player?.icon_index]}
              alt=""
              width="64px"
              height="64px"
              onClick={() => handleChangeIcon(player?.uid)}
            />

            <div className="info">
              <p onClick={() => handleRename(player?.uid)}>{`${
                player?.username || ""
              }${player?.uid === uuid ? " (You)" : ""}`}</p>

              <div>
                <p>{player?.money || "0"}</p>

                {player?.uid === dealerUid && !isHost && (
                  <div className="dealer_block">D</div>
                )}

                {isHost && (
                  <div
                    className={`dealer_block ${
                      player?.uid === dealerUid ? "" : "not_dealer"
                    }`}
                    onClick={() =>
                      player?.uid !== dealerUid && handleDealer(player?.uid)
                    }
                  >
                    D
                  </div>
                )}
              </div>
            </div>

            {isHost && !ongoingGame && player?.uid !== uuid && (
              <>
                <button type="button" onClick={() => handleBan(player?.uid)}>
                  Ban
                </button>
                <button type="button" onClick={() => handleOut(player?.uid)}>
                  Out
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersBlock;
