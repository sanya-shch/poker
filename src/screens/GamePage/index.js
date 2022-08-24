import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  lazy,
  Suspense,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import { ToastContext } from "../../components/Toast";
import { db } from "../../firebase";
import { getUserId } from "../../helpers";
import Header from "../../modules/Header";
import Menu from "../../modules/Menu";
import GameBlock from "../../modules/GameBlock";

import "./style.scss";

const StartBlock = lazy(() => import("../../modules/StartBlock"));
const StartModal = lazy(() => import("../../modules/StartModal"));

const GamePage = () => {
  let { id } = useParams();
  id = id.toUpperCase();

  const { setToast } = useContext(ToastContext);

  const uuid = getUserId();
  const navigate = useNavigate();

  const [gameData, setGameData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [ongoingGame, setOngoingGame] = useState(false);
  const [isMidGamePlayer, setIsMidGamePlayer] = useState(false);

  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const [isWaitStart, setIsWaitStart] = useState(false);

  const checkIfGameExists = useCallback(async () => {
    const docSnap = await getDoc(doc(db, "game_rooms_poker", id));
    if (!docSnap.exists()) {
      navigate("/");
    }
  }, [navigate, id]);

  useEffect(() => {
    checkIfGameExists();
    const unsubscribe = onSnapshot(doc(db, "game_rooms_poker", id), (doc) => {
      setGameData(doc.data());
      setDataLoaded(true);
    });
    return () => {
      unsubscribe();
    };
  }, [checkIfGameExists, id]);

  const checkIfUserExists = useCallback(() => {
    let userExists = false;
    gameData.player_data_arr.forEach((element) => {
      if (uuid === element.uid) {
        userExists = true;
      }
    });

    const currentNumberOfPlayers = gameData.player_data_arr.length;
    const possibleNumberOfPlayers = 14;

    if (!userExists) {
      setIsStartModalOpen(true);
      setIsWaitStart(false);
    } else if (possibleNumberOfPlayers <= currentNumberOfPlayers) {
      setToast({
        type: "info",
        text: "There are too many players in this game",
      });
      navigate("/");
    } else {
      setIsWaitStart(true);
    }
  }, [gameData?.player_data_arr, uuid, navigate, setToast]);

  const checkIfBanned = useCallback(() => {
    if (gameData.banned_player_uid.indexOf(uuid) !== -1) {
      // setBanned(true);
      setIsStartModalOpen(false);
      setToast({
        type: "danger",
        text: "You have been banned",
      });
      navigate("/");
    }
  }, [gameData?.banned_player_uid, uuid, navigate, setToast]);

  const leaveIfGameDeleted = useCallback(() => {
    if (gameData.game_room_closed) {
      navigate("/");
    }
  }, [gameData?.game_room_closed, navigate]);

  const checkGameStatus = useCallback(() => {
    if (gameData.ongoing_game) {
      setOngoingGame(true);
    } else {
      setOngoingGame(false);
    }
  }, [gameData?.ongoing_game, setOngoingGame]);

  const checkIfMidGamePlayer = useCallback(() => {
    if (gameData.midgame_player_uid.indexOf(uuid) !== -1) {
      setIsMidGamePlayer(true);
    } else {
      setIsMidGamePlayer(false);
    }
  }, [gameData?.midgame_player_uid, uuid]);

  useEffect(() => {
    if (dataLoaded) {
      leaveIfGameDeleted();
      checkIfUserExists();
      checkIfBanned();
      checkGameStatus();
      checkIfMidGamePlayer();
      if (gameData.host_uid === uuid) {
        setIsHost(true);
      }
    }
  }, [
    dataLoaded,
    gameData,
    checkGameStatus,
    checkIfBanned,
    checkIfMidGamePlayer,
    checkIfUserExists,
    leaveIfGameDeleted,
    uuid,
  ]);

  return (
    <>
      <Menu
        open={openMenu}
        setOpen={setOpenMenu}
        id={id}
        uuid={uuid}
        ongoingGame={ongoingGame}
        isHost={isHost}
      />
      <div className={`content ${openMenu ? "content_active" : ""}`}>
        <Header playerDataArr={gameData?.player_data_arr} />
        <div className="game_page">
          {!ongoingGame && isWaitStart && (
            <Suspense>
              <StartBlock
                isHost={isHost}
                playerDataArr={gameData?.player_data_arr}
                uuid={uuid}
                id={id}
              />
            </Suspense>
          )}
          {ongoingGame && !isMidGamePlayer && !isStartModalOpen && (
            <GameBlock
              midgamePlayerUid={gameData?.midgame_player_uid}
              playerDataArr={gameData?.player_data_arr}
              playerCards={gameData?.player_cards}
              cardDeck={gameData?.card_deck}
              // outCardDeck={gameData?.out_card_deck}
              currentPlayerUid={gameData?.current_player_uid}
              playersList={gameData?.players_list}
              setOpenMenu={setOpenMenu}
              uuid={uuid}
              id={id}
            />
          )}
          {isMidGamePlayer && (
            <div className="mid_game_text">
              <p>Please wait for the next game to begin ⏱</p>
            </div>
          )}
          {isStartModalOpen && (
            <Suspense>
              <StartModal
                isOpen={isStartModalOpen}
                handleClose={() => setIsStartModalOpen(false)}
                isHost={isHost}
                iconIndex={gameData?.icon_index}
                id={id}
                uuid={uuid}
                ongoingGame={ongoingGame}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default GamePage;
