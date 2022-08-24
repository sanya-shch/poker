import { doc, updateDoc } from "firebase/firestore";

import cards from "../constants/cards";
import { randomize } from "./randomize";
import { db } from "../firebase";

export const startGame = ({ playerDataArr, id }) => {
  const randomizedCards = randomize(randomize(cards));
  const playerCards = playerDataArr.reduce((acc, item) => {
    acc[item.uid] = randomizedCards.splice(0, 2);

    return acc;
  }, {});

  updateDoc(doc(db, "game_rooms_poker", id), {
    ongoing_game: true,
    player_cards: playerCards,
    card_deck: randomizedCards,
    players_list: playerDataArr.map((item) => item.uid),
  });
};
