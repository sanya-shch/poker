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
import CardItem from "../CardItem";
import bankIcon from "./coins.png";

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
}) => {
  const { setToast } = useContext(ToastContext);

  const handleClickFold = () => {};

  const handleClickCheck = () => {};

  const handleClickRaise = () => {};

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

        <ChipsBlock playerDataArr={playerDataArr} uuid={uuid} />

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
