import { gameActionTypes } from "../constants/gameActionTypes";

export const getWinners = ({
  allInBanks,
  combinations,
  bankCount,
  lastActions,
  smallBlind = 25,
}) => {
  const cardsCost = [
    ...new Set(combinations.map((item) => item.combination.combinationCost)),
  ];

  if (cardsCost.length === 1) {
    let bank = bankCount;
    const length = combinations.length;

    const [allInPlayers, notAllInPlayers] = combinations.reduce(
      (acc, item) => {
        if (lastActions[item.uid].action === gameActionTypes.all_in) {
          acc[0].push(item);
        } else {
          acc[1].push(item);
        }

        return acc;
      },
      [[], []]
    );

    const notAllInPlayersBank =
      Math.floor(bank / smallBlind / notAllInPlayers.length) * smallBlind;

    return notAllInPlayers.reduce(
      (acc, item, index) => {
        if (index + 1 === notAllInPlayers.length) {
          acc.push({ uid: item.uid, bank: bank });
        } else {
          bank -= notAllInPlayersBank;

          acc.push({ uid: item.uid, bank: notAllInPlayersBank });
        }

        return acc;
      },
      allInPlayers.reduce((acc, item) => {
        const currentBank =
          Math.floor(allInBanks[item.uid].bank / smallBlind / length) *
          smallBlind;

        bank -= currentBank;

        acc.push({ uid: item.uid, bank: currentBank });

        return acc;
      }, [])
    );
  }

  const filteredPlayersCombinations = combinations.filter(
    (item) => item.combination.combinationCost === cardsCost[0]
  );

  if (filteredPlayersCombinations.length === 1) {
    if (
      lastActions[filteredPlayersCombinations[0].uid]?.action ===
      gameActionTypes.all_in
    ) {
      const newFilteredPlayersCombinations = combinations.filter(
        (item) => item.uid !== filteredPlayersCombinations[0].uid
      );

      let bank =
        bankCount - allInBanks[filteredPlayersCombinations[0].uid].bank;

      if (lastActions[newFilteredPlayersCombinations[0].uid]?.action !==
        gameActionTypes.all_in) {
        return [
          {
            uid: filteredPlayersCombinations[0].uid,
            bank: allInBanks[filteredPlayersCombinations[0].uid].bank,
          },
          {
            uid: newFilteredPlayersCombinations[0].uid,
            bank,
          }
        ];
      } else {
        return [
          ...newFilteredPlayersCombinations.map((item, index) => {
            if (index + 1 === newFilteredPlayersCombinations.length) {
              return { uid: item.uid, bank: bank };
            } else {
              const currentBank =
                Math.floor(
                  bank / smallBlind / newFilteredPlayersCombinations.length
                ) * smallBlind;

              bank -= currentBank;

              return { uid: item.uid, bank: currentBank };
            }
          }),
          {
            uid: filteredPlayersCombinations[0].uid,
            bank: allInBanks[filteredPlayersCombinations[0].uid].bank,
          },
        ];
      }
    } else {
      return [{ uid: filteredPlayersCombinations[0].uid, bank: bankCount }];
    }
  } else {
    if (
      filteredPlayersCombinations.every(
        (item) => lastActions[item.uid].action !== gameActionTypes.all_in
      )
    ) {
      let bank = bankCount;

      return filteredPlayersCombinations.map((item, index) => {
        if (index + 1 === filteredPlayersCombinations.length) {
          return { uid: item.uid, bank: bank };
        } else {
          const currentBank =
            Math.floor(bank / smallBlind / filteredPlayersCombinations.length) *
            smallBlind;

          bank -= currentBank;

          return { uid: item.uid, bank: currentBank };
        }
      });
    } else {
      let bank = bankCount;
      const length = filteredPlayersCombinations.length;

      const [allInPlayers, notAllInPlayers] =
        filteredPlayersCombinations.reduce(
          (acc, item) => {
            if (lastActions[item.uid].action === gameActionTypes.all_in) {
              acc[0].push(item);
            } else {
              acc[1].push(item);
            }

            return acc;
          },
          [[], []]
        );

      const notAllInPlayersBank =
        Math.floor(bank / smallBlind / notAllInPlayers.length) * smallBlind;

      return notAllInPlayers.reduce(
        (acc, item, index) => {
          if (index + 1 === notAllInPlayers.length) {
            acc.push({ uid: item.uid, bank: bank });
          } else {
            bank -= notAllInPlayersBank;

            acc.push({ uid: item.uid, bank: notAllInPlayersBank });
          }

          return acc;
        },
        allInPlayers.reduce((acc, item) => {
          const currentBank =
            Math.floor(allInBanks[item.uid].bank / smallBlind / length) *
            smallBlind;

          bank -= currentBank;

          acc.push({ uid: item.uid, bank: currentBank });

          return acc;
        }, [])
      );
    }
  }
};
