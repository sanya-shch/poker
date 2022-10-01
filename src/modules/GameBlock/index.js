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
import { getGameCards, getNextPlayer, isRoundOver } from "../../helpers";
import { gameActionTypes } from "../../constants/gameActionTypes";
import { gameStages } from "../../constants/gameStage";
import DesktopGameBoard from "../GameBoard";

import "./style.scss";

const BackgroundCards = lazy(() => import("../BackgroundCards"));

const GameBlock = ({
  midgamePlayerUid,
  playerDataArr,
  playerCards,
  cardDeck,
  currentPlayerUid,
  playersList,
  uuid,
  id,
  setOpenMenu,
  dealerUid,
  lastActions,
  gameCards,
  bankCount,
  withBackgroundAnimation,
  gameStage,
  isHost,
  currentBet = 0,
  allInBanks,
  setIsFinishModalOpen,
}) => {
  // ¯\_(ツ)_/¯
  const [isRaise, setIsRaise] = useState(false);
  const [value, setValue] = React.useState("50");
  const playerMoney = useMemo(
    () => playerDataArr.find((findItem) => findItem.uid === uuid)?.money,
    [playerDataArr, uuid]
  );

  const handleClickFold = async () => {
    const filteredPlayers = playersList.filter(
      (item) => lastActions[item]?.action !== gameActionTypes.fold
    );

    if (filteredPlayers.length - 1) {
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
    () => playerDataArr.find((item) => item.uid === uuid).money <= currentBet,
    [playerDataArr, uuid, currentBet]
  );

  const handleClickCheck = async () => {
    const nextUid = getNextPlayer(
      playersList.filter(
        (item) => lastActions[item]?.action !== gameActionTypes.fold
      ),
      uuid
    );

    const spendMoney = lastActions[uuid]?.number || 0;

    await updateDoc(doc(db, `game_rooms_poker/${id}`), {
      current_player_uid: nextUid,
      last_actions: {
        ...lastActions,
        [uuid]: {
          action:
            currentBet === 0 ? gameActionTypes.check : gameActionTypes.call,
          number: currentBet,
          end: true,
        },
      },
      bank: isOnlyAllIn
        ? bankCount + playerDataArr.find((item) => item.uid === uuid).money
        : bankCount + currentBet - spendMoney,
      player_data_arr: playerDataArr.map((item) =>
        item.uid === uuid
          ? {
              ...item,
              money:
                item.money + spendMoney < currentBet
                  ? 0
                  : item.money + spendMoney - currentBet,
            }
          : item
      ),
      ...(isOnlyAllIn
        ? { all_in_banks: { ...allInBanks, [uuid]: { bank: bankCount } } }
        : {}),
      history_list: arrayUnion({
        message: currentBet === 0 ? gameActionTypes.check : gameActionTypes.call,
        uid: uuid,
        gameStage,
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
        (item) => lastActions[item]?.action !== gameActionTypes.fold
      ),
      uuid
    );

    const isAllIn = Number(playerMoney) === Number(value);

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
          action: isAllIn ? gameActionTypes.all_in : gameActionTypes.raise,
          number: Number(value),
          end: true,
        },
      },
      current_bet: currentBet >= Number(value) ? currentBet : Number(value),
      bank: bankCount + Number(value) - spendMoney,
      player_data_arr: playerDataArr.map((item) =>
        item.uid === uuid
          ? {
              ...item,
              money: isAllIn ? 0 : item.money + spendMoney - Number(value),
            }
          : item
      ),
      ...(isAllIn
        ? { all_in_banks: { ...allInBanks, [uuid]: { bank: bankCount } } }
        : {}),
      history_list: arrayUnion({
        message: isAllIn ? gameActionTypes.all_in : gameActionTypes.raise,
        number: Number(value),
        uid: uuid,
        gameStage,
      }),
    });

    setIsRaise(false);
  };

  const isOver = useMemo(
    () => isRoundOver({ lastActions, playersList }),
    [lastActions, playersList]
  );

  const handleRoundOver = useCallback(async () => {
    switch (gameStage) {
      case gameStages.start:
        await updateDoc(doc(db, `game_rooms_poker/${id}`), {
          last_actions: Object.keys(lastActions).reduce((acc, item) => {
            if (
              lastActions[item]?.action === gameActionTypes.fold ||
              lastActions[item]?.action === gameActionTypes.all_in
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
        });
        break;
      case gameStages.flop:
        await updateDoc(doc(db, `game_rooms_poker/${id}`), {
          last_actions: Object.keys(lastActions).reduce((acc, item) => {
            if (
              lastActions[item]?.action === gameActionTypes.fold ||
              lastActions[item]?.action === gameActionTypes.all_in
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
        });
        break;
      case gameStages.turn:
        await updateDoc(doc(db, `game_rooms_poker/${id}`), {
          last_actions: Object.keys(lastActions).reduce((acc, item) => {
            if (
              lastActions[item]?.action === gameActionTypes.fold ||
              lastActions[item]?.action === gameActionTypes.all_in
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
        });
        break;
      case gameStages.river:
        setIsFinishModalOpen(true);
        break;
      default:
        break;
    }
  }, [cardDeck, gameStage, id, lastActions, setIsFinishModalOpen]);

  useEffect(() => {
    if (isHost) {
      if (isOver) {
        handleRoundOver();
      }
    } else {
      if (isOver && gameStage === gameStages.river) {
        setIsFinishModalOpen(true);
      }
    }
  }, [gameStage, isHost, isOver, handleRoundOver, setIsFinishModalOpen]);

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
        ) ? (
          isRaise ? (
            <div className="range_block_wrapper">
              <button onClick={handleBack}>Back</button>
              <div className="range_block">
                <Range
                  min="50"
                  max={playerMoney}
                  step="25"
                  value={value}
                  setValue={setValue}
                />
              </div>
              <button onClick={handleOk}>
                {Number(playerMoney) === Number(value)
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
                  currentBet === 0 ? "Check" : isOnlyAllIn ? "All in" : "Call"
                }
                onClick={handleClickCheck}
              />
              {!isOnlyAllIn && (
                <MainButton
                  text={currentBet === 0 ? "Bet" : "Raise"}
                  onClick={handleClickRaise}
                />
              )}
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
