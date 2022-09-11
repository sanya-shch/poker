import React from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";

import "./style.scss";

const UserBlock = ({
  imgSrc,
  username,
  itsI,
  isCurrentPlayer,
  numberOfCards,
  isHost,
  isStartBlock,
  handleKick,
  dealerUid,
  playerUid,
  id,
}) => {
  const handleClick = async () => {
    if (playerUid !== dealerUid && isHost) {
      await updateDoc(doc(db, `game_rooms_poker/${id}`), {
        dealer_uid: playerUid,
      });
    }
  };

  return (
    <div
      className={`user_block ${itsI ? "itsI" : ""} ${
        isCurrentPlayer ? "is_current_player" : ""
      }`}
    >
      <p>{username}</p>
      <img src={imgSrc} alt="" width="65px" height="65px" loading="lazy" />
      <div
        className={`dealer_block ${
          playerUid === dealerUid ? "current" : ""
        } ${isHost ? 'is_host' : ''}`}
        onClick={handleClick}
      >
        D
      </div>
      {isHost && isStartBlock && !itsI && (
        <button onClick={handleKick}>X</button>
      )}
    </div>
  );
};

export default UserBlock;
