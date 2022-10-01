import React, { useState, useContext } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import icons, {
  catIcons,
  peopleIcons,
  // playerIcons,
  // animalIcons,
} from "../../assets/playerIcons";
import { db } from "../../firebase";
import { ToastContext } from "../../components/Toast";
import ReactPortal from "../../components/ReactPortal";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";

import "./style.scss";

const iconsList = [
  ...Object.keys(peopleIcons),
  // ...Object.keys(animalIcons),
  ...Object.keys(catIcons),
  // ...Object.keys(playerIcons),
];

const StartModal = ({ isOpen, handleClose, isHost, id, uuid, ongoingGame }) => {
  const { setToast } = useContext(ToastContext);

  const [checked, setChecked] = useState(Object.keys(peopleIcons)[0]);
  const [username, setUsername] = useState("");

  const handleClick = () => {
    if (checked && username) {
      updateDoc(doc(db, "game_rooms_poker", id), {
        player_data_arr: arrayUnion({
          username,
          uid: uuid,
          points: 0,
          icon_index: checked,
          money: 5000,
          // chips: {
          //   25: 4,
          //   100: 4,
          //   500: 4,
          //   1000: 4,
          // }
        }),
      });

      if (ongoingGame) {
        updateDoc(doc(db, "game_rooms_poker", id), {
          midgame_player_uid: arrayUnion(uuid),
        });
      }

      handleClose();
    } else {
      if (!username) {
        setToast({
          type: "danger",
          text: "Enter your username",
        });
      }
      if (!checked) {
        setToast({
          type: "danger",
          text: "Select the icon",
        });
      }
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-start-modal">
      <div className="start-modal">
        <div className="modal-content">
          <div className="input_name_block">
            <Input maxLength={12} value={username} onChange={handleChange} />
          </div>
          <div className="content_block">
            <div className="icons_block custom_scrollbar">
              {iconsList.map((item) => (
                <div
                  key={`img-${item}`}
                  className={item === checked ? "checked" : ""}
                >
                  <img
                    src={icons[item]}
                    alt={item}
                    width="65px"
                    height="65px"
                    onClick={() => setChecked(item)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="btn_block">
            <MainButton text="Join" onClick={handleClick} />
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default StartModal;
