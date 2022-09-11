import React, { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { gameStages } from "../../constants/gameStage";
import { ToastContext } from "../../components/Toast";
import ButtonCopy from "../../components/ButtonCopy";
import MainButton from "../../components/MainButton";
import CombinationBlock from "../CombinationBlock";
import Toggle from "../../components/Toggle";

import "./style.scss";

const Menu = ({
  open,
  setOpen,
  id,
  uuid,
  isHost,
  ongoingGame,
  withBackgroundAnimation = false,
}) => {
  const { setToast } = useContext(ToastContext);

  const handleClickReset = async () => {
    await updateDoc(doc(db, "game_rooms_poker", id), {
      ongoing_game: false,
      midgame_player_uid: [],
      card_deck: [],
      player_cards: {},
      players_list: [],
      // out_card_deck: [],
      current_player_uid: uuid,
      last_actions: {},
      game_stage: gameStages.start,
      game_cards: [],
      bank: 0,
      current_bet: 0,
      all_in_banks: {},
    });
  };

  const handleToggle = async () => {
    await updateDoc(doc(db, "game_rooms_poker", id), {
      with_background_animation: !withBackgroundAnimation,
    });
  };

  return (
    <div className={`menu ${open ? "menu_active" : ""} ${isHost && ongoingGame ? "" : "big_block"}`}>
      <button className="fancy-burger" onClick={() => setOpen(!open)}>
        <span
          className={`rectangle rectangle--top rectangle--small ${
            open ? "open" : ""
          }`}
        />
        <span className={`rectangle rectangle--middle ${open ? "open" : ""}`} />
        <span
          className={`rectangle rectangle--bottom rectangle--small ${
            open ? "open" : ""
          }`}
        />
      </button>

      <div className="menu_list">
        <div className="game_id_block">
          <span>{id}</span>
          <ButtonCopy
            value={window.location.href}
            onClick={() =>
              setToast({
                type: "success",
                text: "Copy",
              })
            }
          >
            <span>Copy</span>
          </ButtonCopy>
        </div>

        <CombinationBlock />

        {isHost && ongoingGame && (
          <Toggle
            text="Background animation"
            onToggle={handleToggle}
            isToggle={withBackgroundAnimation}
          />
        )}

        {isHost && ongoingGame && (
          <div className="reset_btn">
            <MainButton text="Reset Game ↬" onClick={handleClickReset} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
