import React from "react";

import "./style.scss";

const UserBlock = ({
  imgSrc,
  username,
  itsI,
  isCurrentPlayer,
  money,
  setIsRenameModalOpen,
  setIsChangeIconModalOpen,
}) => {
  const handleRename = () => itsI && setIsRenameModalOpen(true);
  const handleChangeIcon = () => itsI && setIsChangeIconModalOpen(true);

  return (
    <div
      className={`user_block ${itsI ? "itsI" : ""} ${
        isCurrentPlayer ? "is_current_player" : ""
      } ${money <= 25 ? "no_cash" : ""}`}
    >
      <p onClick={handleRename}>{username}</p>
      <img
        src={imgSrc}
        alt=""
        width="65px"
        height="65px"
        onClick={handleChangeIcon}
      />
    </div>
  );
};

export default UserBlock;
