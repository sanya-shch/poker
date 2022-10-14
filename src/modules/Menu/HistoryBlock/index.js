import React from "react";

import icons from "../../../assets/playerIcons";
import * as cardTypeIcons from "../../../assets/cardTypeIcons";
import { gameActionTypes } from "../../../constants/gameActionTypes";
import cards from "../../../constants/cards";

import "./style.scss";

const HistoryBlock = ({ historyList, playerDataArr }) => {
  const players = playerDataArr.reduce(
    (acc, item) => ({ ...acc, [item.uid]: item }),
    {}
  );

  return (
    <div className="menu_history_block">
      <h4>History</h4>

      <div className="custom_scrollbar">
        {historyList.map((item, index) => (
          <div key={`history_item_${index}`} className="history_item">
            {item.cards ? (
              item.cards.map((card) => (
                <div key={card} className="cards_item">
                  <p>{cards?.[card]?.number}</p>
                  <img
                    src={cardTypeIcons[cards?.[card]?.type]}
                    alt=""
                    width="28px"
                    height="28px"
                  />
                </div>
              ))
            ) : (
              <>
                <img
                  className="player_img"
                  src={icons[players[item.uid].icon_index]}
                  alt=""
                  width="64px"
                  height="64px"
                />

                <div className="history_player_block">
                  <p>{players[item.uid].username}</p>

                  <p>
                    {item.message === gameActionTypes.small_blind
                      ? "Small Blind"
                      : item.message === gameActionTypes.big_blind
                      ? "Big Blind"
                      : item.message === gameActionTypes.call
                      ? "Call"
                      : item.message === gameActionTypes.check
                      ? "Check"
                      : item.message === gameActionTypes.bet
                      ? `Bet ${item.number}`
                      : item.message === gameActionTypes.raise
                      ? `Raise to ${item.number}`
                      : item.message === gameActionTypes.all_in
                      ? `All in ${item.number}`
                      : item.message === gameActionTypes.fold
                      ? "Fold"
                      : item.message}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {historyList.length === 0 && (
        <div className="empty_state">
          <p>Nothing Here</p>
        </div>
      )}
    </div>
  );
};

export default HistoryBlock;
