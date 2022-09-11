import React, { useContext } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
import * as icons from "../../assets/playerIcons";
import { ToastContext } from "../../components/Toast";
import { startGame } from "../../helpers";
import MainButton from "../../components/MainButton";
import UserBlock from "../UserBlock";

import "./style.scss";

const StartBlock = ({ isHost, playerDataArr, uuid, id, dealerUid }) => {
  const { setToast } = useContext(ToastContext);

  const handleClickStart = () => {
    if (playerDataArr?.length >= 2) {
      startGame({ playerDataArr, id, dealerUid });
    } else {
      setToast({
        type: "danger",
        text: "At least 2 players are required",
      });
    }
  };

  const handleClickDelete = async () => {
    await updateDoc(doc(db, "game_rooms_poker", id), {
      game_room_closed: true,
    });
    await deleteDoc(doc(db, "game_rooms_poker", id));
    await updateDoc(doc(db, "game_room_codes_poker", "code_array"), {
      codes: arrayRemove(id),
    });
  };

  const handleKick = async (uid) => {
    await updateDoc(doc(db, "game_rooms_poker", id), {
      banned_player_uid: arrayUnion(uid),
      player_data_arr: playerDataArr.filter((player) => player.uid !== uid),
    });
  };

  return (
    <div className="start_block">
      <div className="player_block">
        {playerDataArr?.map((player) => (
          <UserBlock
            key={player.uid}
            imgSrc={icons[player.icon_index]}
            username={player.username}
            itsI={uuid === player.uid}
            numberOfCards={10}
            isHost={isHost}
            handleKick={() => handleKick(player.uid)}
            isStartBlock
            dealerUid={dealerUid}
            playerUid={player.uid}
            id={id}
          />
        ))}
      </div>
      {isHost && (
        <div className="btn-block">
          <MainButton text="Delete Room ×" onClick={handleClickDelete} />
          <MainButton text="Start Game →" onClick={handleClickStart} />
        </div>
      )}
    </div>
  );
};

export default StartBlock;
