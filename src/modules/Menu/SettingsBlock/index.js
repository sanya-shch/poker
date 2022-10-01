import React, { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";

import ButtonCopy from "../../../components/ButtonCopy";
import Toggle from "../../../components/Toggle";
import MainButton from "../../../components/MainButton";
import { db } from "../../../firebase";
import { gameStages } from "../../../constants/gameStage";
import { ToastContext } from "../../../components/Toast";

import "./style.scss";

const SettingsBlock = ({
  isHost,
  withBackgroundAnimation,
  id,
  ongoingGame,
  uuid,
}) => {
  const { setToast } = useContext(ToastContext);

  const handleClickReset = async () => {
    await updateDoc(doc(db, "game_rooms_poker", id), {
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
      all_in_banks: {},
    });
  };

  const handleToggle = async () => {
    await updateDoc(doc(db, "game_rooms_poker", id), {
      with_background_animation: !withBackgroundAnimation,
    });
  };

  return (
    <div className="menu_settings_block">
      <h4>Settings</h4>

      <div className="custom_scrollbar">
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

export default SettingsBlock;
