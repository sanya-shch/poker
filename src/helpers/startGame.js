import { doc, updateDoc } from "firebase/firestore";

import cards from "../constants/cards";
import { randomize } from "./randomize";
import { db } from "../firebase";
import { getNextPlayer } from "./getNextPlayer";
import { gameActionTypes } from "../constants/gameActionTypes";

export const startGame = ({ playerDataArr, id, dealerUid }) => {
  const randomizedCards = randomize(Object.keys(cards));
  const playerCards = playerDataArr.reduce((acc, item) => {
    acc[item.uid] = randomizedCards.splice(0, 2);

    return acc;
  }, {});

  const playersList = playerDataArr.map((item) => item.uid);

  const sbPlayerUid = getNextPlayer(playersList, dealerUid);
  const bbPlayerUid = getNextPlayer(playersList, sbPlayerUid);

  const lastActions = {
    [sbPlayerUid]: { action: gameActionTypes.small_blind },
    [bbPlayerUid]: { action: gameActionTypes.big_blind },
  };

  updateDoc(doc(db, "game_rooms_poker", id), {
    ongoing_game: true,
    player_cards: playerCards,
    card_deck: randomizedCards,
    players_list: playersList,
    last_actions: lastActions,
    bank: 75,
    player_data_arr: playerDataArr.map((item) => {
      if (item.uid === sbPlayerUid) {
        return {
          ...item,
          money: item.money - 25,
          chips: { ...item.chips, 25: item.chips[25] - 1 },
        };
      } else if (item.uid === bbPlayerUid) {
        return {
          ...item,
          money: item.money - 50,
          chips: { ...item.chips, 25: item.chips[25] - 2 },
        };
      }

      return item;
    }),
  });
};
