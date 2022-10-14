import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import MainButton from "../../components/MainButton";
import MainInput from "../../components/MainInput";
import { db } from "../../firebase";
import { getUserId, getSixLetterCode, createGame } from "../../helpers";
import { ToastContext } from "../../components/Toast";
import { cloverBig, diamondBig } from "../../assets/cardTypeIcons";

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
      <div className="first_row">
        <svg viewBox="0 0 400 175">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="50%" dy=".35em">
              Poker
            </text>
          </symbol>
          <use className="text" xlinkHref="#s-text" />
          <use className="text" xlinkHref="#s-text" />
          <use className="text" xlinkHref="#s-text" />
          <use className="text" xlinkHref="#s-text" />
          <use className="text" xlinkHref="#s-text" />
        </svg>
      </div>

      <div className="second_row">
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
          <span />
          <img src={cloverBig} alt="" width="300px" height="300px" />
          <img src={diamondBig} alt="" width="300px" height="300px" />
        </div>
      </div>

      <div className="main_background_container">
        <h2>AK2631095Q87J410849JA6357KQ2437QJA2K105869</h2>
        <h2>41093KAQJ52687Q6758294J10AK352J384A76Q910K</h2>
        <h2>975Q82JA643K10895AQ62104J3K7102A5369487QJK</h2>
        <h2>J947Q5A1032K68AK45276310Q98JA5374KJQ869210</h2>
        <h2>5J21069A83K7Q46538KJ94A2Q710487K93J5A1062Q</h2>
        <h2>Q576K9431082AJ2A598KQ3J106745KA64982QJ3107</h2>
        <h2>9243AJQ8K10567JQ8492K3A567104J510896K2AQ73</h2>
        <h2>Q2K79A6J3105484398J62AQ710K5Q69810J2AK4375</h2>
        <h2>7610JK83AQ4952Q472986JA310K52A3107QK5J4968</h2>
        <h2>1045KQ3972AJ68A51069478Q2JK3675A2K9JQ48310</h2>
        <h2>726AJK108594Q38Q956A73J1024K2J57AK1064983Q</h2>
        <h2>46JK7825A109Q3JA674938510K2Q576483A10Q2KJ9</h2>
        <h2>JQ56310492K78A96J472A103K85Q468529J10Q7K3A</h2>
        <h2>QJ3586AK92471059K48103QA762J7235JK910AQ486</h2>
        <h2>KJ3410257A86Q9731089AQJ4526K4795108KQ62AJ3</h2>
        <h2>957KJQ3481062A6Q3410J2K958A7KQAJ8397461052</h2>
      </div>
    </div>
  );
}

export default HomePage;
