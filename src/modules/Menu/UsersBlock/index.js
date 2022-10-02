import React from "react";

import icons from "../../../assets/playerIcons";

import "./style.scss";

const UsersBlock = ({
  playerDataArr,
  playersList,
  uuid,
  ongoingGame,
  dealerUid,
}) => {
  const players = playerDataArr.reduce((acc, item) => {
    if (!ongoingGame || playersList.includes(item.uid)) {
      acc[item.uid] = item;
    }

    return acc;
  }, {});

  const { [uuid]: currentPlayer, ...restPlayers } = players;

  return (
    <div className="menu_users_block">
      <h4>Players</h4>

      <div className="custom_scrollbar">
        {[currentPlayer, ...Object.values(restPlayers)].map((player) => (
          <div key={player.uid} className="player_item">
            <img
              src={icons?.[player?.icon_index]}
              alt=""
              width="64px"
              height="64px"
            />

            <div className="info">
              <p>{`${player.username}${
                player.uid === uuid ? " (You)" : ""
              }`}</p>

              <div>
                <p>{player.money || '0'}</p>

                {player.uid === dealerUid && <div className="dealer_block">D</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersBlock;
