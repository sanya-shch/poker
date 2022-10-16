import React from "react";

import { RollCounterRange } from "./RollCounterRange";

import "./style.scss";

const Range = ({ value, setValue, min = "0", max = "5000", step }) => {
  React.useEffect(() => {
    new RollCounterRange("#range2", step);
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
          setValue(
            e.nativeEvent.wheelDelta > 0
              ? Number(value) + step <= Number(max)
                ? Number(value) + step
                : Number(max)
              : Number(value) - step >= Number(min)
                ? Number(value) - step
                : Number(min)
          )
        }
      />
    </form>
  );
};

export default Range;
