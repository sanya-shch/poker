import { gameStages } from "../constants/gameStage";

export const getGameCards = ({ gameStage, cardDeck }) => {
  if (gameStage === gameStages.start) {
    return cardDeck.slice(1, 4);
  }
  return cardDeck.slice(1, 2);
};
