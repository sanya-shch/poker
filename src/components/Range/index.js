import React from "react";

import { RollCounterRange } from "./RollCounterRange";

import "./style.scss";

const Range = ({ value, setValue, min = "0", max = "5000", step = "25" }) => {
  React.useEffect(() => {
    new RollCounterRange("#range2");
  }, []);

  return (
    <form>
      <input
        id="range2"
        name="range2"
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => setValue(e.target.value)}
        onWheel={(e) =>
          setValue(e.nativeEvent.wheelDelta > 0
            ? Number(value) + 50 <= Number(max)
              ? Number(value) + 50
              : Number(max)
            : Number(value) - 50 >= Number(min)
              ? Number(value) - 50
              : Number(min)
          )
        }
      />
    </form>
  );
};

export default Range;
