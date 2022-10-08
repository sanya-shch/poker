import React, { useState, useMemo } from "react";
import { doc, updateDoc } from "firebase/firestore";

import icons, {
  peopleIcons,
  // catIcons,
  // playerIcons,
  // animalIcons,
} from "../../assets/playerIcons";
import { db } from "../../firebase";
import ReactPortal from "../../components/ReactPortal";
import MainButton from "../../components/MainButton";
import { useOutsideClick } from "../../helpers";

import "./style.scss";

const iconsList = [
  ...Object.keys(peopleIcons),
  // ...Object.keys(animalIcons),
  // ...Object.keys(catIcons),
  // ...Object.keys(playerIcons),
];

const ChangeIconModal = ({ isOpen, handleClose, id, uuid, playerDataArr }) => {
  const handleClickOutside = () => {
    handleClose();
  };

  const ref = React.useRef(null);
  useOutsideClick(ref, handleClickOutside);

  const [checked, setChecked] = useState(Object.keys(peopleIcons)[0]);

  const usersIconsList = useMemo(
    () => playerDataArr.map((item) => item.icon_index),
    [playerDataArr]
  );
  const filteredIconsList = useMemo(
    () => iconsList.filter((item) => !usersIconsList.includes(item)),
    [iconsList, usersIconsList]
  );

  const handleClick = () => {
    if (checked) {
      updateDoc(doc(db, "game_rooms_poker", id), {
        player_data_arr: playerDataArr.map((item) =>
          item.uid === uuid ? { ...item, icon_index: checked } : item
        ),
      });

      handleClose();
    } else {
      handleClose();
    }
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
    <ReactPortal wrapperId="react-portal-change-icon-modal">
      <div className="change-icon-modal">
        <div className="modal-content" ref={ref}>
          <div className="content_block">
            <div className="icons_block custom_scrollbar">
              {filteredIconsList.map((item) => (
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
            <MainButton text="Change" onClick={handleClick} />
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default ChangeIconModal;
