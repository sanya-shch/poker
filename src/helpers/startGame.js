import { doc, updateDoc } from "firebase/firestore";

import cards from "../constants/cards";
import { randomize } from "./randomize";
import { db } from "../firebase";
import { getNextPlayer } from "./getNextPlayer";
import { gameActionTypes } from "../constants/gameActionTypes";

export const startGame = ({
  playerDataArr,
  id,
  dealerUid,
  smallBlind,
  bigBlind,
}) => {
  const randomizedCards = randomize(Object.keys(cards));
  const playerCards = playerDataArr.reduce(
    (acc, item) => {
      acc[item.uid].push(...randomizedCards.splice(0, 1));

      return acc;
    },
    playerDataArr.reduce((acc, item) => {
      acc[item.uid] = randomizedCards.splice(0, 1);

      return acc;
    }, {})
  );

  const playersList = playerDataArr
    .filter((item) => item.money > smallBlind)
    .map((item) => item.uid);

  const sbPlayerUid = getNextPlayer(playersList, dealerUid);
  const bbPlayerUid = getNextPlayer(playersList, sbPlayerUid);

  const lastActions = {
    [sbPlayerUid]: { action: gameActionTypes.small_blind, number: smallBlind },
    [bbPlayerUid]: {
      action: gameActionTypes.big_blind,
      number: bigBlind,
      end: true,
    },
  };

  const newCurrentPlayerUid = getNextPlayer(playersList, bbPlayerUid);

  updateDoc(doc(db, "game_rooms_poker", id), {
    ongoing_game: true,
    player_cards: playerCards,
    card_deck: randomizedCards,
    players_list: playersList,
    last_actions: lastActions,
    bank: smallBlind + bigBlind,
    player_data_arr: playerDataArr
      .filter((item) => item.money > smallBlind)
      .map((item) => {
        if (item.uid === sbPlayerUid) {
          return {
            ...item,
            money: item.money - smallBlind,
            // chips: { ...item.chips, 25: item.chips[25] - 1 },
          };
        } else if (item.uid === bbPlayerUid) {
          return {
            ...item,
            money: item.money - bigBlind,
            // chips: { ...item.chips, 25: item.chips[25] - 2 },
          };
        }

        return item;
      }),
    current_player_uid: newCurrentPlayerUid,
    current_bet: bigBlind,
    history_list: [
      {
        message: "Dealer",
        uid: dealerUid,
      },
      {
        message: gameActionTypes.small_blind,
        uid: sbPlayerUid,
      },
      {
        message: gameActionTypes.big_blind,
        uid: bbPlayerUid,
      },
    ],
    lastStreetBank: 0,
  });
};
