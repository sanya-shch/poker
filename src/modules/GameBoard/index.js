import React from "react";

import CardItem from "../CardItem";
import bankIcon from "../GameBlock/coins.png";
import { gameActionTypes } from "../../constants/gameActionTypes";
import cards from "../../constants/cards";
import * as cardTypeIcons from "../../assets/cardTypeIcons";
import icons from "../../assets/playerIcons";

import "./style.scss";

const GameBoard = ({
  gameCards,
  bankCount,
  playerDataArr,
  playersList,
  lastActions,
  uuid,
  playerCards,
  currentPlayerUid,
  dealerUid,
}) => {
  const players = playersList.reduce((acc, item) => {
    acc.push(playerDataArr.find((findItem) => findItem.uid === item));

    return acc;
  }, []);

  return (
    <div className="game_board_wrapper">
      <div className={`game_board_container players_${players.length}`}>
        {players.map((player, index) => (
          <div key={player.uid} className={`player_block player_${index + 1}`}>
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
              {lastActions[player.uid]?.action === gameActionTypes.bet && (
                <div className="player_action_block">
                  Bet {lastActions[player.uid]?.number}
                </div>
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
        ))}

        <div className="bank_block">
          <img src={bankIcon} width="50px" height="50px" alt="" />
          <p>{bankCount || 0}</p>
        </div>

        <div className="cards">
          <CardItem cardId={gameCards[0]} />
          <CardItem cardId={gameCards[1]} />
          <CardItem cardId={gameCards[2]} />
          <CardItem cardId={gameCards[3]} />
          <CardItem cardId={gameCards[4]} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
