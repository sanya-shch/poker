import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import MainButton from "../../components/MainButton";
import MainInput from "../../components/MainInput";
import { db } from "../../firebase";
import { getUserId, getSixLetterCode, createGame } from "../../helpers";
import { ToastContext } from "../../components/Toast";

import "./style.scss";

function HomePage({ gameId, setGameId }) {
  const { setToast } = useContext(ToastContext);

  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const uuid = getUserId();

  useEffect(() => {
    setGameId(getSixLetterCode());
  }, [setGameId]);

  const handleClickNewGame = () => {
    createGame({
      uuid,
      gameId,
      setGameId,
      navigate,
    });
  };
  const handleClickJoinToGame = async () => {
    if (code !== "") {
      const codesDoc = await getDoc(
        doc(db, "game_room_codes_poker", "code_array")
      );

      if (codesDoc.data().codes.indexOf(code) !== -1) {
        navigate(`/game/${code}`);
      } else {
        setToast({
          type: "danger",
          text: "Please enter a valid code",
        });
      }
    } else {
      setToast({
        type: "danger",
        text: "Please enter a code",
      });
    }
  };
  const handleChange = (value) => {
    setCode(value.toUpperCase());
  };

  return (
    <div className="home_page">
      {/*<h2 className="main_text" data-text="&nbsp;Poker&nbsp;">&nbsp;Poker&nbsp;</h2>*/}
      <div className="input_block">
        <MainButton text="New Game" onClick={handleClickNewGame} />
        <MainInput
          label="Enter Game Code"
          btnText="Join"
          maxLength={6}
          value={code}
          onChange={handleChange}
          onClick={handleClickJoinToGame}
        />
      </div>
      <div className="animated_items">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default HomePage;
