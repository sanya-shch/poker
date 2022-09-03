import React, { useMemo } from "react";

import * as cardTypeIcons from "../../assets/cardTypeIcons";
import cards from "../../constants/cards";
import cardIconsArr from "../../constants/cardIconsArr";

import "./style.scss";

const CardItem = ({ cardId }) => {
  const iconsData = useMemo(
    () => cardIconsArr?.[cards[cardId]?.number],
    [cardId]
  );

  const cardType = useMemo(() => cards?.[cardId]?.type, [cardId]);
  const cardNumber = useMemo(() => cards?.[cardId]?.number, [cardId]);

  return cardId ? (
    <div className="card_item">
      <p>{cardNumber}</p>
      {iconsData === 'b' ? <img
        src={cardTypeIcons[`${cardType}Big`]}
        alt=""
      />  : iconsData.map((iconsRow, index) => (
        <div className="icons_row" key={`card-row-${cardType}-${cardNumber}-${index}`}>
          {iconsRow?.map((iconItem, index) => (
            <img
              key={`card-icon-${cardType}-${cardNumber}-${index}`}
              src={cardTypeIcons[iconItem ? cardType : `${cardType}Gray`]}
              alt=""
              width="32px"
              height="32px"
            />
          ))}
        </div>
      ))}
      <p>{cardNumber}</p>
    </div>
  ) : (
    <div className="empty_card_item" />
  );
};

export default CardItem;
