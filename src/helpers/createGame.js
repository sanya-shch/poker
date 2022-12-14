import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import { getSixLetterCode } from "../helpers";
import { gameStages } from "../constants/gameStage";

export const createGame = async ({ uuid, gameId, setGameId, navigate }) => {
  try {
    let codeArr = [];
    const codesDoc = await getDoc(
      doc(db, "game_room_codes_poker", "code_array")
    );

    if (codesDoc.exists()) {
      codesDoc.data().codes.forEach((element) => {
        codeArr.push(element);
      });
      while (codeArr.indexOf(gameId) !== -1) {
        setGameId(getSixLetterCode());
      }
      codeArr.push(gameId);
      await updateDoc(doc(db, "game_room_codes_poker/code_array"), {
        codes: codeArr,
      });
    } else {
      codeArr.push(gameId);
      await setDoc(doc(db, "game_room_codes_poker/code_array"), {
        codes: codeArr,
      });
    }

    await setDoc(doc(db, `game_rooms_poker/${gameId}`), {
      host_uid: uuid,
      card_deck: [],
      player_data_arr: [],
      player_cards: {},
      banned_player_uid: [],
      midgame_player_uid: [],
      game_room_closed: false,
      ongoing_game: false,
      current_player_uid: uuid,
      players_list: [],
      dealer_uid: uuid,
      last_actions: {},
      game_stage: gameStages.start,
      game_cards: [],
      bank: 0,
      current_bet: 0,
      all_in_banks: {},
      spend_money: {},
      messages_list: [],
      messages_last_updates: "",
      messages_info: {},
      history_list: [],
      last_street_bank: 0,
      game_setting__with_background_animation: false,
      game_setting__small_blind: 25,
      game_setting__big_blind: 50,
    });

    navigate(`/game/${gameId}`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
