import { gameActionTypes } from "../constants/gameActionTypes";

export const isAllInAllInOrEnd = ({ lastActions, playersList }) => {
  return (
    playersList.length &&
    playersList.filter(
      (playerUid) =>
        !(lastActions[playerUid]?.action === gameActionTypes.fold ||
        lastActions[playerUid]?.action === gameActionTypes.all_in)
    ).length <= 1
  );
};
