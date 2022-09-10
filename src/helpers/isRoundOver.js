import { gameActionTypes } from "../constants/gameActionTypes";

export const isRoundOver = ({ lastActions, playersList }) => {
  return (
    Object.keys(playersList).length &&
    Object.keys(playersList).length === Object.keys(lastActions).length &&
    Object.keys(lastActions).every(
      (item) =>
        lastActions[item].end ||
        lastActions[item].action === gameActionTypes.fold
    )
  );
};
