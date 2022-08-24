import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  lazy,
  Suspense,
} from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { ToastContext } from "../../components/Toast";
import MainButton from "../../components/MainButton";
import ChipsBlock from "../ChipsBlock";
import PlayersBlock from "../PlayersBlock";

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
}) => {
  const { setToast } = useContext(ToastContext);

  const handleClickFold = () => {};

  const handleClickCheck = () => {};

  const handleClickRaise = () => {};

  return (
    <>
      <div className="game_block">
        <PlayersBlock
          midgamePlayerUid={midgamePlayerUid}
          playerDataArr={playerDataArr}
          playerCards={playerCards}
          currentPlayerUid={currentPlayerUid}
          playersList={playersList}
          uuid={uuid}
        />

        {/*<CardsBlock*/}

        {/*/>*/}

        <div className="game_board">
          <div className="cards">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <ChipsBlock />
        </div>

        {currentPlayerUid === uuid && (
          <div className="game_buttons_block">
            <MainButton text="Fold" onClick={handleClickFold} />
            <MainButton text="Check" onClick={handleClickCheck} />
            <MainButton text="Raise" onClick={handleClickRaise} />
          </div>
        )}
      </div>
    </>
  );
};

export default GameBlock;
