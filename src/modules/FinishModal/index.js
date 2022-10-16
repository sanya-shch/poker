import React from "react";

import { useMount } from "../../helpers";
import ReactPortal from "../../components/ReactPortal";
import Layout from "./Layout";

import "./style.scss";

const FinishModal = ({
  isOpen,
  handleClose,
  isHost,
  id,
  uuid,
  playerCards,
  lastActions,
  gameCards,
  playerDataArr,
  playersList,
  dealerUid,
  allInBanks,
  bankCount,
  smallBlind,
}) => {
  const { mounted } = useMount({ opened: isOpen });

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <ReactPortal wrapperId="react-portal-finish-modal">
      <Layout
        isOpen={isOpen}
        handleClose={handleClose}
        isHost={isHost}
        id={id}
        uuid={uuid}
        playerCards={playerCards}
        lastActions={lastActions}
        gameCards={gameCards}
        playerDataArr={playerDataArr}
        playersList={playersList}
        dealerUid={dealerUid}
        allInBanks={allInBanks}
        bankCount={bankCount}
        smallBlind={smallBlind}
      />
    </ReactPortal>
  );
};

export default FinishModal;
