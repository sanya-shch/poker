import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db } from "../../firebase";
import { ToastContext } from "../../components/Toast";
import MainButton from "../../components/MainButton";
// import ChipsBlock from "../ChipsBlock";
import PlayersBlock from "../PlayersBlock";
import CardItem from "../CardItem";
import bankIcon from "./coins.png";
import BackgroundCards from "../BackgroundCards";
import Range from "../../components/Range";
import {
  combinationCheck,
  getGameCards,
  getNextPlayer,
  isRoundOver,
} from "../../helpers";
import { gameActionTypes } from "../../constants/gameActionTypes";
import { gameStages } from "../../constants/gameStage";

import "./style.scss";

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
}) => {
  const { setToast } = useContext(ToastContext);

  const [isRaise, setIsRaise] = useState(false);
  const [value, setValue] = React.useState("50");
  const playerMoney = useMemo(
    () => playerDataArr.find((findItem) => findItem.uid === uuid)?.money,
    [playerDataArr, uuid]
  );

  const handleClickFold = async () => {
    const nextUid = getNextPlayer(
      playersList.filter(
        (item) => lastActions[item]?.action !== gameActionTypes.fold
      ),
      uuid
    );

    await updateDoc(doc(db, `game_rooms_poker/${id}`), {
      current_player_uid: nextUid,
      last_actions: {
        ...lastActions,
        [uuid]: { action: gameActionTypes.fold },
      },
    });
  };

  const handleClickCheck = async () => {
    const nextUid = getNextPlayer(
      playersList.filter(
        (item) => lastActions[item]?.action !== gameActionTypes.fold
      ),
      uuid
    );

    await updateDoc(doc(db, `game_rooms_poker/${id}`), {
      current_player_uid: nextUid,
      last_actions: {
        ...lastActions,
        [uuid]: {
          action:
            currentBet === 0 ? gameActionTypes.check : gameActionTypes.call,
          end: true,
        },
      },
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

    await updateDoc(doc(db, `game_rooms_poker/${id}`), {
      current_player_uid: nextUid,
      last_actions: {
        ...lastActions,
        [uuid]: {
          action: isAllIn ? gameActionTypes.all_in : gameActionTypes.raise,
          number: Number(value),
          end: true,
        },
        current_bet: Number(value),
      },
    });
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
          card_deck: cardDeck.slice(2),
        });
        break;
      case gameStages.river:
        const combinations = Object.keys(playerCards)
          .filter((uid) => lastActions[uid].action !== gameActionTypes.fold)
          .map((uid) => ({
            combinationCost: combinationCheck([
              ...playerCards[uid],
              ...gameCards,
            ]),
            uid,
          }))
          .sort(
            (a, b) => Number(b.combinationCost) - Number(a.combinationCost)
          );

        const winner = playerDataArr.find(
          (item) => item.uid === combinations[0].uid
        );

        const nextUid = getNextPlayer(playersList, uuid);

        // setToast({
        //   type: "success",
        //   text: `${winner.username} won`,
        //   duration: 10000,
        // });

        await updateDoc(doc(db, `game_rooms_poker/${id}`), {
          ongoing_game: false,
          midgame_player_uid: [],
          card_deck: [],
          player_cards: {},
          players_list: [],
          current_player_uid: uuid,
          last_actions: {},
          game_stage: gameStages.start,
          game_cards: [],
          bank: 0,
          current_bet: 0,
          player_data_arr: playerDataArr.map((item) =>
            item.uid === winner.uid
              ? { ...item, points: item.points + 1 }
              : item
          ),
          dealer_uid: nextUid,
        });
        break;
      default:
        break;
    }
  }, [cardDeck, gameStage, id, lastActions]);

  useEffect(() => {
    if (isHost) {
      if (isOver) {
        handleRoundOver();
      }
    }
  }, [gameStage, isHost, isOver, handleRoundOver]);

  return (
    <>
      <div className="game_block">
        <div className="players_block_wrapper">
          <div className="bank_block">
            <img src={bankIcon} width="50px" height="50px" alt="" />
            <p>{bankCount || 0}</p>
          </div>
          <PlayersBlock
            midgamePlayerUid={midgamePlayerUid}
            playerDataArr={playerDataArr}
            playerCards={playerCards}
            currentPlayerUid={currentPlayerUid}
            playersList={playersList}
            uuid={uuid}
            dealerUid={dealerUid}
            lastActions={lastActions}
            gameCards={gameCards}
          />
        </div>

        <div className="game_board">
          <div className="cards">
            <CardItem cardId={gameCards[0]} />
            <CardItem cardId={gameCards[1]} />
            <CardItem cardId={gameCards[2]} />
            <CardItem cardId={gameCards[3]} />
            <CardItem cardId={gameCards[4]} />
          </div>
        </div>

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
                text={currentBet === 0 ? "Check" : "Call"}
                onClick={handleClickCheck}
              />
              <MainButton
                text={currentBet === 0 ? "Bet" : "Raise"}
                onClick={handleClickRaise}
              />
            </div>
          )
        ) : null}

        {withBackgroundAnimation && <BackgroundCards />}
      </div>
    </>
  );
};

export default GameBlock;
