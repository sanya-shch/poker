import React from "react";

import { gameActionTypes } from "../../constants/gameActionTypes";
import * as cardTypeIcons from "../../assets/cardTypeIcons";
import cards from "../../constants/cards";
// import { isRoundOver } from "../../helpers";

import "./style.scss";
import * as icons from "../../assets/playerIcons";

const PlayersBlock = ({
  playerDataArr,
  playerCards,
  currentPlayerUid,
  playersList,
  uuid,
  dealerUid,
  lastActions,
  gameCards,
}) => {
  const players = playersList.reduce((acc, item) => {
    acc.push(playerDataArr.find((findItem) => findItem.uid === item));

    return acc;
  }, []);

  return (
    <div className="players_block">
      {players.map((player, index) => (
        <React.Fragment key={player.uid}>
          <div className="player_block">
            {lastActions[player.uid]?.action === gameActionTypes.fold ? (
              <div className="fold_block">FOLD</div>
            ) : player.uid === uuid ? (
              <div className="player_cards">
                <div>
                  <p>{cards[playerCards[player.uid][0]].number}</p>
                  <img
                    src={cardTypeIcons[cards[playerCards[player.uid][0]].type]}
                    alt=""
                  />
                  <img
                    src={cardTypeIcons[cards[playerCards[player.uid][0]].type]}
                    alt=""
                  />
                </div>
                <div>
                  <p>{cards[playerCards[player.uid][1]].number}</p>
                  <img
                    src={cardTypeIcons[cards[playerCards[player.uid][1]].type]}
                    alt=""
                  />
                  <img
                    src={cardTypeIcons[cards[playerCards[player.uid][1]].type]}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="hidden_player_cards">
                <div />
                <div />
              </div>
            )}
            <div
              className={[
                "player_info",
                player.uid === currentPlayerUid && "current_player",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="player_text_info">
                <div className="username_block">
                  <p>{player.uid === uuid ? "You" : player.username}</p>
                </div>

                <div className="money_block">
                  <p>{player.money}</p>

                  {player.uid === dealerUid && (
                    <div className="dealer_block">D</div>
                  )}
                </div>

                <img
                  src={icons[player.icon_index]}
                  alt=""
                  width="52px"
                  height="52px"
                />
              </div>

              {lastActions[player.uid]?.action ===
                gameActionTypes.small_blind && (
                <div className="player_action_block">Small Blind</div>
              )}
              {lastActions[player.uid]?.action ===
                gameActionTypes.big_blind && (
                <div className="player_action_block">Big Blind</div>
              )}
              {lastActions[player.uid]?.action === gameActionTypes.call && (
                <div className="player_action_block">Call</div>
              )}
              {lastActions[player.uid]?.action === gameActionTypes.check && (
                <div className="player_action_block">Check</div>
              )}
              {lastActions[player.uid]?.action === gameActionTypes.raise && (
                <div className="player_action_block">
                  Raise to {lastActions[player.uid]?.number}
                </div>
              )}
              {lastActions[player.uid]?.action === gameActionTypes.all_in && (
                <div className="player_action_block">
                  All in {lastActions[player.uid]?.number}
                </div>
              )}
            </div>
          </div>
          {players.length !== index + 1 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PlayersBlock;
