import React from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
// import ModalLayout from "../../components/ModalLayout";
import ModalLayout from "./ModalLayout";
import { gameActionTypes } from "../../constants/gameActionTypes";
import { combinationCheck, getNextPlayer, getWinners } from "../../helpers";
import { gameStages } from "../../constants/gameStage";
import CircleTimer from "../../components/CircleTimer";
import Tooltip from "../../components/Tooltip";
import * as cardTypeIcons from "../../assets/cardTypeIcons";

import "./style.scss";

const Layout = ({
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
  smallBlind,
}) => {
  const combinations = Object.keys(playerCards)
    .filter((uid) => lastActions[uid]?.action !== gameActionTypes.fold)
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
    smallBlind,
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
      });

      handleClose();
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

  return (
    <ModalLayout opened={isOpen} contentStyle="finish-modal">
      <div className="modal-content">
        <div className="modal-header">
          <div>Game Results</div>

          <CircleTimer />
        </div>

        <div className="content_block combination_block custom_scrollbar">
          {combinations.map((item) => (
            <div key={item.uid} className="combination_item">
              <p className={winnersList.includes(item.uid) ? "winner" : ""}>
                {item.uid === uuid ? "You" : players[item.uid].username}
              </p>

              <Tooltip text={item.combination.combinationName} position="left">
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
    </ModalLayout>
  );
};

export default Layout;
