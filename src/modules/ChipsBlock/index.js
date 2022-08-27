import React from "react";

import "./style.scss";

const ChipsBlock = ({ playerDataArr, uuid }) => {
  const player = playerDataArr.find((findItem) => findItem.uid === uuid);

  return (
    <div className="chips_container">
      {/*<div id="#073d91" className="chip">*/}
      {/*  <span>25</span>*/}
      {/*</div>*/}
      {/*<div id="#32a9f1" className="chip">*/}
      {/*  <span>100</span>*/}
      {/*</div>*/}
      {/*<div id="orange" className="chip">*/}
      {/*  <span>500</span>*/}
      {/*</div>*/}
      {/*<div id="#315a97" className="chip">*/}
      {/*  <span>1000</span>*/}
      {/*</div>*/}
      {/*<div id="#ff9108" className="chip">*/}
      {/*  <span>5000</span>*/}
      {/*</div>*/}
      {/*<div id="#cbbeb5" className="chip">*/}
      {/*  <span>10000</span>*/}
      {/*</div>*/}

      {/*<div className="pokerchip white"></div>*/}
      {/*<div className="pokerchip red"></div>*/}
      {/*<div className="pokerchip blue"></div>*/}
      {player.chips[25] && (
        <div className="pokerchip green">
          <div>{player.chips[25]}</div>
        </div>
      )}
      {player.chips[100] && (
        <div className="pokerchip black">
          <div>{player.chips[100]}</div>
        </div>
      )}
      {player.chips[500] && (
        <div className="pokerchip purple">
          <div>{player.chips[500]}</div>
        </div>
      )}
      {player.chips[1000] && (
        <div className="pokerchip yellow">
          <div>{player.chips[1000]}</div>
        </div>
      )}
      {/*<div className="pokerchip orange"></div>*/}
    </div>
  );
};

export default ChipsBlock;
