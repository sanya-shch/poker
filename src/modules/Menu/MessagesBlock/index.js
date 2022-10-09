import React, { useState, useEffect } from "react";
import { arrayUnion, doc, updateDoc, Timestamp } from "firebase/firestore";

import { db } from "../../../firebase";
import icons from "../../../assets/playerIcons";

import "./style.scss";

const MessagesBlock = ({
  messagesList,
  messagesLastUpdates,
  messagesInfo,
  id,
  uuid,
  ongoingGame,
  playersList,
  playerDataArr,
  open,
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
        messages_last_updates: Timestamp.now(),
        messages_info: Object.keys(messagesInfo).includes(uuid)
          ? {
              ...messagesInfo,
              [uuid]: { ...messagesInfo[uuid], lastView: Timestamp.now() },
            }
          : { ...messagesInfo, [uuid]: { lastView: Timestamp.now() } },
      });

      setMessage("");
    }
  };

  const handleFocus = () => {
    updateDoc(doc(db, `game_rooms_poker/${id}`), {
      messages_info: {
        ...messagesInfo,
        [uuid]: { ...messagesInfo[uuid], isWriting: true },
      },
    });
  };

  const handleBlur = () => {
    updateDoc(doc(db, `game_rooms_poker/${id}`), {
      messages_info: {
        ...messagesInfo,
        [uuid]: { ...messagesInfo[uuid], isWriting: false },
      },
    });
  };

  const setLastMessageViews = () => {
    updateDoc(doc(db, `game_rooms_poker/${id}`), {
      messages_info: Object.keys(messagesInfo).includes(uuid)
        ? {
            ...messagesInfo,
            [uuid]: {
              ...messagesInfo[uuid],
              uid: uuid,
              lastView: Timestamp.now(),
            },
          }
        : { ...messagesInfo, [uuid]: { uid: uuid, lastView: Timestamp.now() } },
    });
  };

  useEffect(() => {
    if (open) {
      setLastMessageViews();
    }

    return () => {
      if (open) {
        setLastMessageViews();
      }
    };
  }, [open]);

  return (
    <div className="menu_messages_block">
      <h4>Chat</h4>

      <div className="custom_scrollbar">
        {messagesList.map((messageItem, index) => (
          <div
            key={`message_${index}`}
            className={`message_item ${
              messageItem.uid === uuid ? "current" : ""
            }`}
          >
            <img
              src={icons[players[messageItem.uid].icon_index]}
              alt=""
              width="64px"
              height="64px"
            />

            <div className="message_block">
              <div className="message_title">
                {players[messageItem.uid].username}
              </div>

              <div className="message_text">{messageItem.message}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="write_players">
        {Object.values(messagesInfo)
          .filter((item) => item.isWriting && item.uid !== uuid)
          .map((item) => players[item.uid].username)
          .join(", ")}
      </p>

      <textarea
        id="story"
        name="story"
        rows="3"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
      />

      <button onClick={handleSend} className="send_btn">
        Send
      </button>
    </div>
  );
};

export default MessagesBlock;
