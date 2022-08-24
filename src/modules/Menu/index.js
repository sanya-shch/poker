import React, { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { ToastContext } from "../../components/Toast";
import ButtonCopy from "../../components/ButtonCopy";
import MainButton from "../../components/MainButton";

import "./style.scss";

const Menu = ({
  open,
  setOpen,
  id,
  uuid,
  isHost,
  ongoingGame,
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
    });
  };

  return (
    <div className={`menu ${open ? "menu_active" : ""}`}>
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
