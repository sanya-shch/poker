import React from "react";

import * as cardTypeIcons from "../../../assets/cardTypeIcons";

import "./style.scss";

const CombinationBlock = () => (
  <div className="combination_block">
    <h4>Hand Rankings</h4>

    <div className="custom_scrollbar">
      <div className="combination_item">
        <p>Royal flush</p>
        <div className="combination_item_row">
          <div className="combination_card_item">
            <p>A</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>K</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>Q</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>J</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>10</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
        </div>
      </div>

      <div className="combination_item">
        <p>Straight flush</p>
        <div className="combination_item_row">
          <div className="combination_card_item">
            <p>9</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>8</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>7</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>6</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>5</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
        </div>
      </div>

      <div className="combination_item">
        <p>Four of a kind</p>
        <div className="combination_item_row">
          <div className="combination_card_item">
            <p>9</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>9</p>
            <img src={cardTypeIcons.diamond} alt="" />
          </div>
          <div className="combination_card_item">
            <p>9</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
          <div className="combination_card_item">
            <p>9</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>7</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
        </div>
      </div>

      <div className="combination_item">
        <p>Full house</p>
        <div className="combination_item_row">
          <div className="combination_card_item">
            <p>A</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>A</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
          <div className="combination_card_item">
            <p>A</p>
            <img src={cardTypeIcons.diamond} alt="" />
          </div>
          <div className="combination_card_item">
            <p>2</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>2</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
        </div>
      </div>

      <div className="combination_item">
        <p>Flush</p>
        <div className="combination_item_row">
          <div className="combination_card_item">
            <p>K</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
          <div className="combination_card_item">
            <p>10</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
          <div className="combination_card_item">
            <p>8</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
          <div className="combination_card_item">
            <p>7</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
          <div className="combination_card_item">
            <p>5</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
        </div>
      </div>

      <div className="combination_item">
        <p>Straight</p>
        <div className="combination_item_row">
          <div className="combination_card_item">
            <p>5</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>4</p>
            <img src={cardTypeIcons.diamond} alt="" />
          </div>
          <div className="combination_card_item">
            <p>3</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>2</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>A</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
        </div>
      </div>

      <div className="combination_item">
        <p>Three of a kind</p>
        <div className="combination_item_row">
          <div className="combination_card_item">
            <p>7</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>7</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
          <div className="combination_card_item">
            <p>7</p>
            <img src={cardTypeIcons.diamond} alt="" />
          </div>
          <div className="combination_card_item">
            <p>Q</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>4</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
        </div>
      </div>

      <div className="combination_item">
        <p>Two pair</p>
        <div className="combination_item_row">
          <div className="combination_card_item">
            <p>J</p>
            <img src={cardTypeIcons.diamond} alt="" />
          </div>
          <div className="combination_card_item">
            <p>J</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>5</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>5</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
          <div className="combination_card_item">
            <p>3</p>
            <img src={cardTypeIcons.diamond} alt="" />
          </div>
        </div>
      </div>

      <div className="combination_item">
        <p>Pair</p>
        <div className="combination_item_row">
          <div className="combination_card_item">
            <p>K</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>K</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
          <div className="combination_card_item">
            <p>J</p>
            <img src={cardTypeIcons.diamond} alt="" />
          </div>
          <div className="combination_card_item">
            <p>8</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>3</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
        </div>
      </div>

      <div className="combination_item">
        <p>High Card</p>
        <div className="combination_item_row">
          <div className="combination_card_item">
            <p>A</p>
            <img src={cardTypeIcons.diamond} alt="" />
          </div>
          <div className="combination_card_item">
            <p>J</p>
            <img src={cardTypeIcons.clover} alt="" />
          </div>
          <div className="combination_card_item">
            <p>7</p>
            <img src={cardTypeIcons.heart} alt="" />
          </div>
          <div className="combination_card_item">
            <p>4</p>
            <img src={cardTypeIcons.spades} alt="" />
          </div>
          <div className="combination_card_item">
            <p>2</p>
            <img src={cardTypeIcons.diamond} alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CombinationBlock;
