import React, { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { db } from "../../../firebase";
import icons from "../../../assets/playerIcons";

import "./style.scss";

const MessagesBlock = ({
  messagesList,
  id,
  uuid,
  ongoingGame,
  playersList,
  playerDataArr,
}) => {
  const [message, setMessage] = useState("");

  const players = playerDataArr.reduce((acc, item) => {
    if (!ongoingGame || playersList.includes(item.uid)) {
      acc[item.uid] = item;
    }

    return acc;
  }, {});

  const handleSend = async () => {
    if (message !== "") {
      await updateDoc(doc(db, `game_rooms_poker/${id}`), {
        messages_list: arrayUnion({
          message,
          uid: uuid,
        }),
      });

      setMessage("");
    }
  };

  return (
    <div className="menu_messages_block">
      <h4>Chat</h4>

      <div className="custom_scrollbar">
        {messagesList.map((messageItem, index) => (
          <div key={`message_${index}`} className={`message_item ${messageItem.uid === uuid ? 'current' : ''}`}>
            <img
              src={icons[players[messageItem.uid].icon_index]}
              alt=""
              width="64px"
              height="64px"
            />

            <div className="message_block">
              <div className="message_title">{players[messageItem.uid].username}</div>

              <div className="message_text">{messageItem.message}</div>
            </div>
          </div>
        ))}
      </div>

      <textarea
        id="story"
        name="story"
        rows="4"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={handleSend} className="send_btn">
        Send
      </button>
    </div>
  );
};

export default MessagesBlock;
