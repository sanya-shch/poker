import React from "react";

import ReactPortal from "../../components/ReactPortal";
import { useMount } from "../../helpers";
import Layout from "./Layout";

import "./style.scss";

const ChangeIconModal = ({ isOpen, handleClose, id, uuid, playerDataArr }) => {
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
    <ReactPortal wrapperId="react-portal-change-icon-modal">
      <Layout
        isOpen={isOpen}
        handleClose={handleClose}
        id={id}
        uuid={uuid}
        playerDataArr={playerDataArr}
      />
    </ReactPortal>
  );
};

export default ChangeIconModal;
