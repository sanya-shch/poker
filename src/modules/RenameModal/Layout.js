import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import MainButton from "../../components/MainButton";
import ModalLayout from "../../components/ModalLayout";
import Input from "../../components/Input";
// import { useOutsideClick } from "../../helpers";

import "./style.scss";

const Layout = ({ isOpen, handleClose, id, uuid, playerDataArr }) => {
  // const handleClickOutside = () => {
  //   handleClose();
  // };
  //
  // const ref = React.useRef(null);
  // useOutsideClick(ref, handleClickOutside);

  const [username, setUsername] = useState("");

  const handleClick = () => {
    if (username) {
      updateDoc(doc(db, "game_rooms_poker", id), {
        player_data_arr: playerDataArr.map((item) =>
          item.uid === uuid ? { ...item, username } : item
        ),
      });

      handleClose();
    } else {
      handleClose();
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <ModalLayout
      onClose={() => handleClose()}
      opened={isOpen}
      contentStyle="rename-modal"
    >
      <div className="modal-content">
        <div className="input_name_block">
          <Input
            maxLength={12}
            value={username}
            onChange={handleChange}
            autofocus
          />
        </div>
        <div className="btn_block">
          <MainButton text={username ? "Rename" : "X"} onClick={handleClick} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default Layout;
