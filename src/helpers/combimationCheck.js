import { combinations } from "../constants/combinations";

const cardCost = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  1: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const cardTypesList = {
  c: "clover",
  d: "diamond",
  h: "heart",
  s: "spades",
};

const cardNumbersList = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  1: 10,
  J: "J",
  Q: "Q",
  K: "K",
  A: "A",
};

export const combinationCheck = (cards) => {
  const sortedCards = [...cards].sort(
    (a, b) => cardCost[b[0]] - cardCost[a[0]]
  );
  const numberOfCards = sortedCards.reduce((acc, card) => {
    if (acc[card[0]]) {
      acc[card[0]] += 1;
    } else {
      acc[card[0]] = 1;
    }

    return acc;
  }, {});
  const numberOfCardsArr = Object.values(numberOfCards).sort((a, b) => b - a);

  const cardTypes = sortedCards.reduce((acc, card) => {
    if (acc[card.at(-1)]) {
      acc[card.at(-1)] += 1;
    } else {
      acc[card.at(-1)] = 1;
    }

    return acc;
  }, {});
  const numbersOfCardTypes = Object.values(cardTypes).sort((a, b) => b - a);

  const straight = sortedCards
    .reduce(
      (acc, card, index, obj) => {
        if (obj.length > index + 1) {
          if (cardCost[card[0]] - cardCost[obj[index + 1][0]] === 1) {
            acc[0].push(obj[index + 1]);
          } else if (cardCost[card[0]] - cardCost[obj[index + 1][0]] !== 0) {
            acc[1].push(acc[0]);
            acc[0] = [obj[index + 1]];
          }
        } else {
          acc[1].push(acc[0]);
        }

        return acc;
      },
      [[sortedCards[0]], []]
    )[1]
    .sort((a, b) => b.length - a.length);

  if (
    straight[0].length >= 5 &&
    numbersOfCardTypes[0] >= 5 &&
    straight[0][0][0] === "A"
  ) {
    // Royal flush

    return {
      combinationCost: straight[0]
        .slice(0, 5)
        .reduce(
          (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
          "9"
        ),
      combinationName: combinations.royal_flush,
      cards: straight[0].slice(0, 5).map((item) => ({
        number: cardNumbersList[item[0]],
        type: cardTypesList[item.at(-1)],
      })),
    };
  }

  if (straight[0].length >= 5 && numbersOfCardTypes[0] >= 5) {
    // Straight flush

    return {
      combinationCost: straight[0]
        .slice(0, 5)
        .reduce(
          (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
          "8"
        ),
      combinationName: combinations.straight_flush,
      cards: straight[0].slice(0, 5).map((item) => ({
        number: cardNumbersList[item[0]],
        type: cardTypesList[item.at(-1)],
      })),
    };
  }

  if (numberOfCardsArr[0] === 4) {
    // Four of a kind

    const [fourArr, notPairArr] = sortedCards.reduce(
      (acc, item) => {
        if (numberOfCards[item[0]] === 4) {
          acc[0].push(item);
        } else {
          acc[1].push(item);
        }

        return acc;
      },
      [[], []]
    );

    return {
      combinationCost: notPairArr.slice(0, 1).reduce(
        (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
        fourArr.reduce(
          (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
          "7"
        )
      ),
      combinationName: combinations.four_of_a_kind,
      cards: [...fourArr, ...notPairArr].map((item) => ({
        number: cardNumbersList[item[0]],
        type: cardTypesList[item.at(-1)],
      })),
    };
  }

  if (
    numberOfCardsArr[0] === 3 &&
    (numberOfCardsArr[1] === 3 || numberOfCardsArr[1] === 2)
  ) {
    // Full house

    const [threeArr, pairArr] = sortedCards.reduce(
      (acc, item) => {
        if (numberOfCards[item[0]] === 3) {
          acc[0].push(item);
        } else if (numberOfCards[item[0]] === 2) {
          acc[1].push(item);
        }

        return acc;
      },
      [[], []]
    );

    return {
      combinationCost: pairArr.reduce(
        (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
        threeArr.reduce(
          (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
          "6"
        )
      ),
      combinationName: combinations.full_house,
      cards: [...threeArr, ...pairArr].map((item) => ({
        number: cardNumbersList[item[0]],
        type: cardTypesList[item.at(-1)],
      })),
    };
  }

  if (numbersOfCardTypes.some((item) => item === 5)) {
    // Flush

    const flushCardTypes = Object.keys(cardTypes).find(
      (item) => cardTypes[item] === 5
    );

    const flushCards = sortedCards.reduce((acc, item) => {
      if (item.at(-1) === flushCardTypes) {
        acc.push(item);
      }

      return acc;
    }, []);

    return {
      combinationCost: flushCards.reduce(
        (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
        "5"
      ),
      combinationName: combinations.flush,
      cards: flushCards.map((item) => ({
        number: cardNumbersList[item[0]],
        type: cardTypesList[item.at(-1)],
      })),
    };
  }

  if (straight[0].length >= 5) {
    // Straight

    return {
      combinationCost: straight[0]
        .slice(0, 5)
        .reduce(
          (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
          "4"
        ),
      combinationName: combinations.straight,
      cards: straight[0].slice(0, 5).map((item) => ({
        number: cardNumbersList[item[0]],
        type: cardTypesList[item.at(-1)],
      })),
    };
  }

  if (numberOfCardsArr[0] === 3) {
    // Three of a kind

    const [pairArr, notPairArr] = sortedCards.reduce(
      (acc, item) => {
        if (numberOfCards[item[0]] === 3) {
          acc[0].push(item);
        } else {
          acc[1].push(item);
        }

        return acc;
      },
      [[], []]
    );

    return {
      combinationCost: notPairArr.slice(0, 2).reduce(
        (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
        pairArr.reduce(
          (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
          "3"
        )
      ),
      combinationName: combinations.three_of_a_kind,
      cards: [...pairArr, ...notPairArr.slice(0, 2)].map((item) => ({
        number: cardNumbersList[item[0]],
        type: cardTypesList[item.at(-1)],
      })),
    };
  }

  if (numberOfCardsArr[0] === 2 && numberOfCardsArr[1] === 2) {
    // Two pair

    let count = 0;
    const [pairArr, notPairArr] = sortedCards.reduce(
      (acc, item) => {
        if (numberOfCards[item[0]] === 2 && count < 4) {
          acc[0].push(item);
          count += 1;
        } else {
          acc[1].push(item);
        }

        return acc;
      },
      [[], []]
    );

    return {
      combinationCost: notPairArr.slice(0, 1).reduce(
        (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
        pairArr.reduce(
          (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
          "2"
        )
      ),
      combinationName: combinations.two_pair,
      cards: [...pairArr, ...notPairArr.slice(0, 1)].map((item) => ({
        number: cardNumbersList[item[0]],
        type: cardTypesList[item.at(-1)],
      })),
    };
  }

  if (numberOfCardsArr[0] === 2) {
    // Pair

    const [pairArr, notPairArr] = sortedCards.reduce(
      (acc, item) => {
        if (numberOfCards[item[0]] === 2) {
          acc[0].push(item);
        } else {
          acc[1].push(item);
        }

        return acc;
      },
      [[], []]
    );

    return {
      combinationCost: notPairArr.slice(0, 3).reduce(
        (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
        pairArr.reduce(
          (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
          "1"
        )
      ),
      combinationName: combinations.pair,
      cards: [...pairArr, ...notPairArr.slice(0, 3)].map((item) => ({
        number: cardNumbersList[item[0]],
        type: cardTypesList[item.at(-1)],
      })),
    };
  }

  // High Card
  return {
    combinationCost: sortedCards
      .slice(0, 5)
      .reduce(
        (acc, item) => acc + cardCost[item[0]].toString().padStart(2, "0"),
        ""
      ),
    combinationName: combinations.high_card,
    cards: sortedCards.slice(0, 5).map((item) => ({
      number: cardNumbersList[item[0]],
      type: cardTypesList[item.at(-1)],
    })),
  };
};
