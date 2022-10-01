import React from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { gameStages } from "../../constants/gameStage";
import * as cardTypeIcons from "../../assets/cardTypeIcons";
import { gameActionTypes } from "../../constants/gameActionTypes";
import { combinationCheck, getNextPlayer, getWinners } from "../../helpers";
import ReactPortal from "../../components/ReactPortal";
import CircleTimer from "../../components/CircleTimer";
import Tooltip from "../../components/Tooltip";

import "./style.scss";

const FinishModal = ({
  isOpen,
  handleClose,
  isHost,
  id,
  uuid,
  playerCards,
  lastActions,
  gameCards,
  playerDataArr,
  playersList,
  dealerUid,
  allInBanks,
  bankCount,
}) => {
  const combinations = Object.keys(playerCards)
    .filter((uid) => lastActions[uid].action !== gameActionTypes.fold)
    .map((uid) => ({
      combination: combinationCheck([...playerCards[uid], ...gameCards]),
      uid,
    }))
    .sort(
      (a, b) =>
        Number(b.combination.combinationCost) -
        Number(a.combination.combinationCost)
    );

  const winners = getWinners({
    allInBanks,
    combinations,
    bankCount,
    lastActions,
  });

  const winnersList = winners.map((item) => item.uid);

  const nextUid = getNextPlayer(playersList, dealerUid);

  const players = playerDataArr.reduce(
    (acc, item) => ({ ...acc, [item.uid]: item }),
    {}
  );

  const finishGameHandler = () => {
    if (isHost) {
      updateDoc(doc(db, `game_rooms_poker/${id}`), {
        ongoing_game: false,
        midgame_player_uid: [],
        card_deck: [],
        player_cards: {},
        players_list: [],
        current_player_uid: uuid,
        last_actions: {},
        game_stage: gameStages.start,
        game_cards: [],
        bank: 0,
        current_bet: 0,
        player_data_arr: playerDataArr.map((item) => {
          const winnerPlayer = winners.find(
            (winner) => item.uid === winner.uid
          );
          return winnerPlayer
            ? {
                ...item,
                points: item.points + 1,
                money: item.money + winnerPlayer.bank,
              }
            : item;
        }),
        dealer_uid: nextUid,
        all_in_banks: {},
      }).finally(() => handleClose());
    } else {
      handleClose();
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      finishGameHandler();
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    // if (isOpen && window.innerWidth > 767) {
    //   document.getElementById("root").style.filter = "blur(2px)";
    // }

    return () => {
      document.body.style.overflow = "auto";
      // document.getElementById("root").style.filter = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-start-modal">
      <div className="finish-modal">
        <div className="modal-content">
          <div className="modal-header">
            <div>Game Results</div>

            <CircleTimer />
          </div>

          <div className="content_block combination_block custom_scrollbar">
            {combinations.map((item) => (
              <div key={item.uid} className="combination_item">
                <p className={winnersList.includes(item.uid) ? "winner" : ""}>
                  {players[item.uid].username}
                </p>

                <Tooltip
                  text={item.combination.combinationName}
                  position="left"
                >
                  <div className="combination_item_row">
                    {item.combination.cards.slice(0, 5).map((card) => (
                      <div
                        key={`${players[item.uid].username}-${card.number}-${
                          card.type
                        }`}
                        className="combination_card_item"
                      >
                        <p>{card.number}</p>
                        <img src={cardTypeIcons[card.type]} alt="" />
                      </div>
                    ))}
                  </div>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default FinishModal;
