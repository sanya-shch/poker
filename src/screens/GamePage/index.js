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
// import GameBlock from "../../modules/GameBlock";

import "./style.scss";

const StartBlock = lazy(() => import("../../modules/StartBlock"));
const GameBlock = lazy(() => import("../../modules/GameBlock"));

const StartModal = lazy(() => import("../../modules/StartModal"));
const FinishModal = lazy(() => import("../../modules/FinishModal"));
const RenameModal = lazy(() => import("../../modules/RenameModal"));
const ChangeIconModal = lazy(() => import("../../modules/ChangeIconModal"));

let finishModalInitial = false;
let renameModalInitial = false;
let changeIconModalInitial = false;

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
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isChangeIconModalOpen, setIsChangeIconModalOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const [isWaitStart, setIsWaitStart] = useState(false);

  useEffect(() => {
    if (isFinishModalOpen && !finishModalInitial) finishModalInitial = true;

    setIsFinishModalOpen(isFinishModalOpen);
  }, [isFinishModalOpen]);
  useEffect(() => {
    if (isRenameModalOpen && !renameModalInitial) renameModalInitial = true;

    setIsRenameModalOpen(isRenameModalOpen);
  }, [isRenameModalOpen]);
  useEffect(() => {
    if (isChangeIconModalOpen && !changeIconModalInitial)
      changeIconModalInitial = true;

    setIsChangeIconModalOpen(isChangeIconModalOpen);
  }, [isChangeIconModalOpen]);

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

    const currentNumberOfPlayers = gameData.player_data_arr.filter(
      (item) => item.money > gameData.game_setting__small_blind
    ).length;
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
  }, [
    gameData?.banned_player_uid,
    uuid,
    navigate,
    setToast,
    gameData?.game_setting__small_blind,
  ]);

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

  const handleClickContent = (event) => {
    if (openMenu) {
      event.stopPropagation();

      setOpenMenu((prev) => !prev);
    }
  };

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openMenu]);

  return (
    <>
      <Menu
        open={openMenu}
        setOpen={setOpenMenu}
        id={id}
        uuid={uuid}
        ongoingGame={ongoingGame}
        isHost={isHost}
        setIsHost={setIsHost}
        withBackgroundAnimation={
          gameData?.game_setting__with_background_animation
        }
        smallBlind={gameData?.game_setting__small_blind}
        bigBlind={gameData?.game_setting__big_blind}
        playerDataArr={gameData?.player_data_arr}
        playersList={gameData?.players_list}
        dealerUid={gameData?.dealer_uid}
        messagesList={gameData?.messages_list}
        messagesLastUpdates={gameData?.messages_last_updates}
        messagesInfo={gameData?.messages_info}
        historyList={gameData?.history_list}
        setIsRenameModalOpen={setIsRenameModalOpen}
        setIsChangeIconModalOpen={setIsChangeIconModalOpen}
      />
      <div
        className={["content", openMenu && "content_active"].join(" ")}
        onClickCapture={handleClickContent}
      >
        <Header isOpen={openMenu} setOpen={setOpenMenu} />
        <div className="game_page">
          {!ongoingGame && isWaitStart && (
            <Suspense>
              <StartBlock
                isHost={isHost}
                playerDataArr={gameData?.player_data_arr}
                uuid={uuid}
                id={id}
                dealerUid={gameData?.dealer_uid}
                setIsRenameModalOpen={setIsRenameModalOpen}
                setIsChangeIconModalOpen={setIsChangeIconModalOpen}
                smallBlind={gameData?.game_setting__small_blind}
                bigBlind={gameData?.game_setting__big_blind}
              />
            </Suspense>
          )}
          {ongoingGame &&
            !isMidGamePlayer &&
            gameData?.players_list?.includes(uuid) && (
              <Suspense>
                <GameBlock
                  playerDataArr={gameData?.player_data_arr}
                  playerCards={gameData?.player_cards}
                  cardDeck={gameData?.card_deck}
                  currentPlayerUid={gameData?.current_player_uid}
                  playersList={gameData?.players_list}
                  uuid={uuid}
                  id={id}
                  dealerUid={gameData?.dealer_uid}
                  lastActions={gameData?.last_actions}
                  gameCards={gameData?.game_cards}
                  bankCount={gameData?.bank}
                  withBackgroundAnimation={
                    gameData?.game_setting__with_background_animation
                  }
                  bigBlind={gameData?.game_setting__big_blind}
                  gameStage={gameData?.game_stage}
                  isHost={isHost}
                  currentBet={gameData?.current_bet}
                  allInBanks={gameData?.all_in_banks}
                  setIsFinishModalOpen={setIsFinishModalOpen}
                  lastStreetBank={gameData?.last_street_bank}
                  spendMoneyList={gameData?.spend_money}
                />
              </Suspense>
            )}
          {isMidGamePlayer && (
            <div className="mid_game_text">
              <p>Please wait for the next game to begin ???</p>
            </div>
          )}
          {isStartModalOpen && (
            <Suspense>
              <StartModal
                isOpen={isStartModalOpen}
                handleClose={() => setIsStartModalOpen(false)}
                isHost={isHost}
                id={id}
                uuid={uuid}
                ongoingGame={ongoingGame}
                playerDataArr={gameData?.player_data_arr}
              />
            </Suspense>
          )}
          {(isFinishModalOpen || finishModalInitial) && (
            <Suspense>
              <FinishModal
                isOpen={isFinishModalOpen}
                handleClose={setIsFinishModalOpen}
                isHost={isHost}
                id={id}
                uuid={uuid}
                playerCards={gameData?.player_cards}
                lastActions={gameData?.last_actions}
                gameCards={gameData?.game_cards}
                playerDataArr={gameData?.player_data_arr}
                playersList={gameData?.players_list}
                dealerUid={gameData?.dealer_uid}
                allInBanks={gameData?.all_in_banks}
                bankCount={gameData?.bank}
                smallBlind={gameData?.game_setting__small_blind}
              />
            </Suspense>
          )}
          {(isRenameModalOpen || renameModalInitial) && (
            <Suspense>
              <RenameModal
                isOpen={isRenameModalOpen}
                handleClose={() => setIsRenameModalOpen(false)}
                id={id}
                uuid={uuid}
                playerDataArr={gameData?.player_data_arr}
              />
            </Suspense>
          )}
          {(isChangeIconModalOpen || changeIconModalInitial) && (
            <Suspense>
              <ChangeIconModal
                isOpen={isChangeIconModalOpen}
                handleClose={() => setIsChangeIconModalOpen(false)}
                id={id}
                uuid={uuid}
                playerDataArr={gameData?.player_data_arr}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default GamePage;
