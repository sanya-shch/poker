import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db } from "../../firebase";
import MainButton from "../../components/MainButton";
// import ChipsBlock from "../ChipsBlock";
import Range from "../../components/Range";
import {
  getGameCards,
  getNextPlayer,
  isAllInAllInOrEnd,
  isRoundOver,
} from "../../helpers";
import { gameActionTypes } from "../../constants/gameActionTypes";
import { gameStages } from "../../constants/gameStage";
import DesktopGameBoard from "../GameBoard";

import "./style.scss";

const BackgroundCards = lazy(() => import("../BackgroundCards"));

const GameBlock = ({
  playerDataArr,
  playerCards,
  cardDeck,
  currentPlayerUid,
  playersList,
  uuid,
  id,
  dealerUid,
  lastActions,
  gameCards,
  bankCount,
  withBackgroundAnimation,
  bigBlind,
  gameStage,
  isHost,
  currentBet = 0,
  allInBanks,
  setIsFinishModalOpen,
  lastStreetBank = 0,
  spendMoneyList,
}) => {
  // ¯\_(ツ)_/¯
  const [isRaise, setIsRaise] = useState(false);
  const [value, setValue] = useState(currentBet + bigBlind);
  const playerMoney = useMemo(
    () => playerDataArr.find((findItem) => findItem.uid === uuid)?.money || 0,
    [playerDataArr, uuid]
  );

  const handleClickFold = async () => {
    const filteredPlayers = playersList.filter(
      (item) => lastActions[item]?.action !== gameActionTypes.fold
    );

    if (filteredPlayers.length === 2) {
      const winnerPlayerUid = filteredPlayers.filter(
        (item) => item !== uuid
      )[0];

      await updateDoc(doc(db, `game_rooms_poker/${id}`), {
        ongoing_game: false,
        midgame_player_uid: [],
        card_deck: [],
        player_cards: {},
        players_list: [],
        last_actions: {},
        game_stage: gameStages.start,
        game_cards: [],
        bank: 0,
        current_bet: 0,
        all_in_banks: {},

        current_player_uid: winnerPlayerUid,
        player_data_arr: playerDataArr.map((item) =>
          item.uid === winnerPlayerUid
            ? {
                ...item,
                money: item.money + bankCount,
                points: item.points + 1,
              }
            : item
        ),
        history_list: arrayUnion(
          ...[
            {
              message: gameActionTypes.fold,
              uid: uuid,
              gameStage,
            },
            {
              message: "Winner",
              uid: winnerPlayerUid,
              gameStage,
            },
          ]
        ),
      });
    } else {
      const nextUid = getNextPlayer(filteredPlayers, uuid);

      await updateDoc(doc(db, `game_rooms_poker/${id}`), {
        current_player_uid: nextUid,
        last_actions: {
          ...lastActions,
          [uuid]: { action: gameActionTypes.fold },
        },
        history_list: arrayUnion({
          message: gameActionTypes.fold,
          uid: uuid,
          gameStage,
        }),
      });
    }
  };

  const isOnlyAllIn = useMemo(
    () =>
      (lastActions[uuid]?.number || 0) +
        playerDataArr.find((item) => item.uid === uuid)?.money <=
      currentBet,
    [playerDataArr, uuid, currentBet]
  );

  const handleClickCheck = async () => {
    const nextUid = getNextPlayer(
      playersList.filter(
        (item) =>
          !(
            lastActions[item]?.action === gameActionTypes.fold ||
            lastActions[item]?.action === gameActionTypes.all_in
          )
      ),
      uuid
    );

    const spendMoney = lastActions[uuid]?.number || 0;

    await updateDoc(doc(db, `game_rooms_poker/${id}`), {
      current_player_uid: nextUid,
      last_actions: {
        ...lastActions,
        [uuid]: {
          action: isOnlyAllIn
            ? gameActionTypes.all_in
            : currentBet === 0
            ? gameActionTypes.check
            : gameActionTypes.call,
          number: isOnlyAllIn ? spendMoney + playerMoney : currentBet,
          end: true,
        },
      },
      bank: isOnlyAllIn
        ? bankCount + playerMoney
        : bankCount + currentBet - spendMoney,
      player_data_arr: playerDataArr.map((item) =>
        item.uid === uuid
          ? {
              ...item,
              money: isOnlyAllIn ? 0 : item.money + spendMoney - currentBet,
            }
          : item
      ),
      all_in_banks: {
        ...Object.entries(allInBanks).reduce((acc, [key, value]) => {
          if (value.gameStage === gameStage) {
            const money = isOnlyAllIn
              ? spendMoneyList[key].money < spendMoney + playerMoney
                ? spendMoneyList[key].money
                : spendMoney + playerMoney
              : spendMoneyList[key].money < currentBet
              ? spendMoneyList[key].money
              : currentBet;

            acc[key] = { ...value, bank: value.bank + money };
          } else {
            acc[key] = value;
          }

          return acc;
        }, {}),
        ...(isOnlyAllIn
          ? {
              [uuid]: {
                bank:
                  lastStreetBank +
                  spendMoney +
                  playerMoney +
                  Object.keys(spendMoneyList).reduce((acc, item) => {
                    if (spendMoneyList[item]) {
                      acc +=
                        spendMoneyList[item].money < spendMoney + playerMoney
                          ? spendMoneyList[item].money
                          : spendMoney + playerMoney;
                    }
                    return acc;
                  }, 0),
                gameStage,
              },
            }
          : {}),
      },
      spend_money: {
        ...spendMoneyList,
        [uuid]: { money: isOnlyAllIn ? spendMoney + playerMoney : currentBet },
      },
      history_list: arrayUnion({
        message: isOnlyAllIn
          ? gameActionTypes.all_in
          : currentBet === 0
          ? gameActionTypes.check
          : gameActionTypes.call,
        uid: uuid,
        gameStage,
        ...(isOnlyAllIn ? { number: spendMoney + playerMoney } : {}),
      }),
    });
  };

  const handleClickRaise = () => {
    setIsRaise(true);
  };

  const handleBack = () => {
    setIsRaise(false);
  };

  const handleOk = async () => {
    const nextUid = getNextPlayer(
      playersList.filter(
        (item) =>
          !(
            lastActions[item]?.action === gameActionTypes.fold ||
            lastActions[item]?.action === gameActionTypes.all_in
          )
      ),
      uuid
    );

    const spendMoney = lastActions[uuid]?.number || 0;

    const isAllIn = Number(playerMoney) + spendMoney === Number(value);

    await updateDoc(doc(db, `game_rooms_poker/${id}`), {
      current_player_uid: nextUid,
      last_actions: {
        // ...lastActions,
        ...Object.keys(lastActions).reduce((acc, item) => {
          if (
            lastActions[item].action === gameActionTypes.fold ||
            lastActions[item].action === gameActionTypes.all_in
          ) {
            acc[item] = lastActions[item];
          } else {
            acc[item] = { ...lastActions[item], end: false };
          }

          return acc;
        }, {}),
        [uuid]: {
          action: isAllIn
            ? gameActionTypes.all_in
            : currentBet === 0
            ? gameActionTypes.bet
            : gameActionTypes.raise,
          number: Number(value),
          end: true,
        },
      },
      current_bet: currentBet >= Number(value) ? currentBet : Number(value),
      bank: isAllIn
        ? bankCount + playerMoney
        : bankCount + Number(value) - spendMoney,
      player_data_arr: playerDataArr.map((item) =>
        item.uid === uuid
          ? {
              ...item,
              money: isAllIn ? 0 : item.money + spendMoney - Number(value),
            }
          : item
      ),
      all_in_banks: {
        ...Object.entries(allInBanks).reduce((acc, [key, val]) => {
          if (val.gameStage === gameStage) {
            const money = isAllIn
              ? spendMoneyList[key].money < spendMoney + playerMoney
                ? spendMoneyList[key].money
                : spendMoney + playerMoney
              : spendMoneyList[key].money < Number(value)
              ? spendMoneyList[key].money
              : Number(value);

            acc[key] = { ...val, bank: val.bank + money };
          } else {
            acc[key] = val;
          }

          return acc;
        }, {}),
        ...(isAllIn
          ? {
              [uuid]: {
                bank:
                  lastStreetBank +
                  spendMoney +
                  playerMoney +
                  Object.keys(spendMoneyList).reduce((acc, item) => {
                    if (spendMoneyList[item]) {
                      acc +=
                        spendMoneyList[item].money < spendMoney + playerMoney
                          ? spendMoneyList[item].money
                          : spendMoney + playerMoney;
                    }
                    return acc;
                  }, 0),
                gameStage,
              },
            }
          : {}),
      },
      spend_money: {
        ...spendMoneyList,
        [uuid]: { money: isAllIn ? spendMoney + playerMoney : Number(value) },
      },
      history_list: arrayUnion({
        message: isAllIn
          ? gameActionTypes.all_in
          : currentBet === 0
          ? gameActionTypes.bet
          : gameActionTypes.raise,
        number: isAllIn ? spendMoney + playerMoney : Number(value),
        uid: uuid,
        gameStage,
      }),
    });

    setIsRaise(false);
  };

  const handleClickAllin = async () => {
    const nextUid = getNextPlayer(
      playersList.filter(
        (item) =>
          !(
            lastActions[item]?.action === gameActionTypes.fold ||
            lastActions[item]?.action === gameActionTypes.all_in
          )
      ),
      uuid
    );

    const spendMoney = lastActions[uuid]?.number || 0;

    await updateDoc(doc(db, `game_rooms_poker/${id}`), {
      current_player_uid: nextUid,
      last_actions: {
        // ...lastActions,
        ...Object.keys(lastActions).reduce((acc, item) => {
          if (
            lastActions[item].action === gameActionTypes.fold ||
            lastActions[item].action === gameActionTypes.all_in
          ) {
            acc[item] = lastActions[item];
          } else {
            acc[item] = { ...lastActions[item], end: false };
          }

          return acc;
        }, {}),
        [uuid]: {
          action: gameActionTypes.all_in,
          number: Number(playerMoney),
          end: true,
        },
      },
      current_bet: spendMoney + Number(playerMoney),
      bank: bankCount + Number(playerMoney),
      player_data_arr: playerDataArr.map((item) =>
        item.uid === uuid
          ? {
              ...item,
              money: 0,
            }
          : item
      ),
      all_in_banks: {
        ...Object.entries(allInBanks).reduce((acc, [key, value]) => {
          if (value.gameStage === gameStage) {
            const money = spendMoneyList[key].money < spendMoney + playerMoney
              ? spendMoneyList[key].money
              : spendMoney + playerMoney;

            acc[key] = { ...value, bank: value.bank + money };
          } else {
            acc[key] = value;
          }

          return acc;
        }, {}),
        [uuid]: { bank: bankCount + Number(playerMoney), gameStage },
      },
      spend_money: {
        ...spendMoneyList,
        [uuid]: { money: spendMoney + playerMoney },
      },
      history_list: arrayUnion({
        message: gameActionTypes.all_in,
        number: spendMoney + Number(playerMoney),
        uid: uuid,
        gameStage,
      }),
    });
  };

  const isOver = useMemo(
    () => isRoundOver({ lastActions, playersList }),
    [lastActions, playersList]
  );

  const handleRoundOver = useCallback(async () => {
    const restPlayers = playersList.filter(
      (item) =>
        !(
          lastActions[item]?.action === gameActionTypes.fold ||
          lastActions[item]?.action === gameActionTypes.all_in
        )
    );

    const isOnePlayerAndInAllinCall =
      restPlayers.length === 1 && lastActions[restPlayers[0]].end;

    const nextUid = getNextPlayer(restPlayers, uuid);

    switch (gameStage) {
      case gameStages.start:
        await updateDoc(doc(db, `game_rooms_poker/${id}`), {
          current_player_uid: nextUid,
          last_actions: Object.keys(lastActions).reduce((acc, item) => {
            if (
              lastActions[item]?.action === gameActionTypes.fold ||
              lastActions[item]?.action === gameActionTypes.all_in ||
              isOnePlayerAndInAllinCall
            )
              acc[item] = lastActions[item];

            return acc;
          }, {}),
          current_bet: 0,
          game_stage: gameStages.flop,
          game_cards: getGameCards({ gameStage, cardDeck }),
          history_list: arrayUnion({
            uid: uuid,
            cards: getGameCards({ gameStage, cardDeck }),
          }),
          card_deck: cardDeck.slice(4),
          last_street_bank: bankCount,
          spend_money: {},
        });
        break;
      case gameStages.flop:
        await updateDoc(doc(db, `game_rooms_poker/${id}`), {
          current_player_uid: nextUid,
          last_actions: Object.keys(lastActions).reduce((acc, item) => {
            if (
              lastActions[item]?.action === gameActionTypes.fold ||
              lastActions[item]?.action === gameActionTypes.all_in ||
              isOnePlayerAndInAllinCall
            )
              acc[item] = lastActions[item];

            return acc;
          }, {}),
          current_bet: 0,
          game_stage: gameStages.turn,
          game_cards: arrayUnion(...getGameCards({ gameStage, cardDeck })),
          history_list: arrayUnion({
            uid: uuid,
            cards: getGameCards({ gameStage, cardDeck }),
          }),
          card_deck: cardDeck.slice(2),
          last_street_bank: bankCount,
          spend_money: {},
        });
        break;
      case gameStages.turn:
        await updateDoc(doc(db, `game_rooms_poker/${id}`), {
          current_player_uid: nextUid,
          last_actions: Object.keys(lastActions).reduce((acc, item) => {
            if (
              lastActions[item]?.action === gameActionTypes.fold ||
              lastActions[item]?.action === gameActionTypes.all_in ||
              isOnePlayerAndInAllinCall
            )
              acc[item] = lastActions[item];

            return acc;
          }, {}),
          current_bet: 0,
          game_stage: gameStages.river,
          game_cards: arrayUnion(...getGameCards({ gameStage, cardDeck })),
          history_list: arrayUnion({
            uid: uuid,
            cards: getGameCards({ gameStage, cardDeck }),
          }),
          card_deck: cardDeck.slice(2),
          last_street_bank: bankCount,
          spend_money: {},
        });
        break;
      case gameStages.river:
        setIsFinishModalOpen(true);
        break;
      default:
        break;
    }
  }, [cardDeck, gameStage, id, lastActions, setIsFinishModalOpen]);

  const isOverAllin = useMemo(
    () => isAllInAllInOrEnd({ lastActions, playersList }),
    [lastActions, playersList]
  );

  useEffect(() => {
    let timer;

    if (isHost) {
      if (isOverAllin) {
        timer = setTimeout(() => handleRoundOver(), 1000);
      } else if (isOver) {
        handleRoundOver();
      }
    } else {
      if (isOverAllin && gameStage === gameStages.river) {
        timer = setTimeout(() => setIsFinishModalOpen(true), 1000);
      } else if (isOver && gameStage === gameStages.river) {
        setIsFinishModalOpen(true);
      }
    }

    return () => clearTimeout(timer);
  }, [gameStage, isHost, isOver, handleRoundOver, setIsFinishModalOpen]);

  useEffect(() => {
    if (currentPlayerUid === uuid) {
      setValue(currentBet + (bigBlind || 50));
    }
  }, [currentBet, bigBlind, currentPlayerUid, uuid]);

  return (
    <>
      <div className="game_block">
        <DesktopGameBoard
          gameCards={gameCards}
          bankCount={bankCount}
          playerDataArr={playerDataArr}
          playersList={playersList}
          lastActions={lastActions}
          uuid={uuid}
          playerCards={playerCards}
          currentPlayerUid={currentPlayerUid}
          dealerUid={dealerUid}
        />

        {/*<ChipsBlock playerDataArr={playerDataArr} uuid={uuid} />*/}

        {currentPlayerUid === uuid &&
        !(
          gameCards.length === 5 && isRoundOver({ lastActions, playersList })
        ) &&
        !isOverAllin &&
        !lastActions[uuid]?.end ? (
          isRaise ? (
            <div className="range_block_wrapper">
              <button onClick={handleBack}>Back</button>
              <div className="range_block">
                <Range
                  min={currentBet + (bigBlind || 50)}
                  max={(lastActions[uuid]?.number || 0) + playerMoney}
                  addedMax={
                    bigBlind -
                    (((lastActions[uuid]?.number || 0) + playerMoney) %
                      bigBlind)
                  }
                  step={bigBlind || "50"}
                  value={value}
                  setValue={setValue}
                />
              </div>
              <button onClick={handleOk}>
                {(lastActions[uuid]?.number || 0) + playerMoney ===
                Number(value)
                  ? "All in"
                  : currentBet === 0
                  ? "Bet"
                  : "Raise"}
              </button>
            </div>
          ) : (
            <div className="game_buttons_block">
              <MainButton text="Fold" onClick={handleClickFold} />
              <MainButton
                text={
                  currentBet === 0
                    ? "Check"
                    : isOnlyAllIn
                    ? "All in"
                    : `Call (${currentBet - (lastActions[uuid]?.number || 0)})`
                }
                onClick={handleClickCheck}
              />
              {!isOnlyAllIn &&
                (Number(currentBet) + bigBlind === Number(playerMoney) ? (
                  <MainButton text="All in" onClick={handleClickAllin} />
                ) : (
                  <MainButton
                    text={currentBet === 0 ? "Bet" : "Raise"}
                    onClick={handleClickRaise}
                  />
                ))}
            </div>
          )
        ) : null}

        {withBackgroundAnimation && (
          <Suspense>
            <BackgroundCards />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default GameBlock;
