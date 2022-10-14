import React, { useContext, useState } from "react";
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
  setIsHost,
  withBackgroundAnimation,
  id,
  ongoingGame,
  uuid,
  playerDataArr,
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

  const [blind, setBlind] = useState(50);

  const handleClearHistory = async () => {
    await updateDoc(doc(db, "game_rooms_poker", id), {
      history_list: [],
    });
  };

  const handleResetAllGame = async () => {
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
      banned_player_uid: [],
      dealer_uid: uuid,
      messages_list: [],
      messages_last_updates: "",
      messages_info: {},
      history_list: [],
      last_street_bank: 0,
      player_data_arr: playerDataArr.map((item) => ({
        ...item,
        money: 5000,
        points: 0,
      })),
    });
  };

  const [selectedOption, setSelectedOption] = useState(
    playerDataArr.find((item) => item.uid === uuid)?.uid || uuid
  );

  const handleChangeHost = async (e) => {
    setSelectedOption(e.target.value);
    setIsHost(false);

    await updateDoc(doc(db, "game_rooms_poker", id), {
      host_uid: e.target.value,
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

        {isHost && !ongoingGame && (
          <div className="blinds_btns">
            <p>Min bet</p>

            <button
              className={blind === 50 ? "selected" : ""}
              type="button"
              onClick={() => setBlind(50)}
            >
              50
            </button>
            <button
              className={blind === 100 ? "selected" : ""}
              type="button"
              onClick={() => setBlind(100)}
            >
              100
            </button>
            <button
              className={blind === 200 ? "selected" : ""}
              type="button"
              onClick={() => setBlind(200)}
            >
              200
            </button>
            <button
              className={blind === 500 ? "selected" : ""}
              type="button"
              onClick={() => setBlind(500)}
            >
              500
            </button>
          </div>
        )}

        {isHost && !ongoingGame && (
          <div className="setting_item__btn">
            <p>Clear game history</p>

            <button type="button" onClick={() => handleClearHistory()}>
              Clear
            </button>
          </div>
        )}

        {isHost && !ongoingGame && (
          <div className="setting_item__btn">
            <p>Reset all game</p>

            <button type="button" onClick={() => handleResetAllGame()}>
              Reset
            </button>
          </div>
        )}

        {isHost && !ongoingGame && (
          <div className="setting_item__select">
            <p>Change the host of the game</p>

            <div className="selectdiv">
              <label>
                <select
                  value={selectedOption}
                  onChange={(e) => handleChangeHost(e)}
                >
                  {playerDataArr.map((item) => (
                    <option key={item.username} value={item.uid}>
                      {item.username}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}

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
