import React from "react";
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
}) => {
  const players = playerDataArr.reduce((acc, item) => {
    if (!ongoingGame || playersList.includes(item.uid)) {
      acc[item.uid] = item;
    }

    return acc;
  }, {});

  const { [uuid]: currentPlayer, ...restPlayers } = players;

  const handleBan = async (uid) => {
    await updateDoc(doc(db, "game_rooms_poker", id), {
      banned_player_uid: arrayUnion(uid),
      player_data_arr: playerDataArr.filter((player) => player.uid !== uid),
    });
  };

  const handleOut = async (uid) => {
    const player = playerDataArr.find((arr) => arr.uid === uid);

    const playersList = playerDataArr
      .filter((item) => item.money > 25)
      .map((item) => item.uid);
    const newDealerUid = getNextPlayer(playersList, dealerUid);

    updateDoc(doc(db, "game_rooms_poker", id), {
      player_data_arr: arrayRemove(player),
      dealer_uid: player.uid === dealerUid ? newDealerUid : dealerUid,
    });
  };

  const handleRename = (uid) => uid === uuid && setIsRenameModalOpen(true);
  const handleChangeIcon = (uid) =>
    uid === uuid && setIsChangeIconModalOpen(true);

  const handleDealer = async (uid) =>
    await updateDoc(doc(db, `game_rooms_poker/${id}`), {
      dealer_uid: uid,
    });

  return (
    <div className="menu_users_block">
      <h4>Players</h4>

      <div className="custom_scrollbar">
        {[currentPlayer, ...Object.values(restPlayers)].map(
          (player) =>
            player && (
              <div
                key={player?.uid}
                className={`player_item ${
                  player?.uid === uuid ? "current" : ""
                }`}
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
                    <button
                      type="button"
                      onClick={() => handleBan(player?.uid)}
                    >
                      Ban
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOut(player?.uid)}
                    >
                      Out
                    </button>
                  </>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default UsersBlock;
