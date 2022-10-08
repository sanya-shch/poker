import React, { useState, useMemo } from "react";
import { doc, updateDoc } from "firebase/firestore";

import icons, {
  peopleIcons,
  // catIcons,
  // playerIcons,
  // animalIcons,
} from "../../assets/playerIcons";
import { db } from "../../firebase";
import MainButton from "../../components/MainButton";
import ModalLayout from "../../components/ModalLayout";

import "./style.scss";

const iconsList = [
  ...Object.keys(peopleIcons),
  // ...Object.keys(animalIcons),
  // ...Object.keys(catIcons),
  // ...Object.keys(playerIcons),
];

const Layout = ({ isOpen, handleClose, id, uuid, playerDataArr }) => {
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

  return (
    <ModalLayout
      onClose={() => handleClose()}
      opened={isOpen}
      contentStyle="change-icon-modal"
    >
      <div className="modal-content">
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
    </ModalLayout>
  );
};

export default Layout;
