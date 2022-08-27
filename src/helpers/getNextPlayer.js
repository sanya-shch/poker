export const getNextPlayer = (playersList, playerUid) => {
  const index = playersList.findIndex((item) => item === playerUid);

  return index === playersList.length - 1
    ? playersList[0]
    : playersList[index + 1];
};
