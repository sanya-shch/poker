import React from "react";

import { RollCounterRange } from "./RollCounterRange";

import "./style.scss";

const Range = ({
  value,
  setValue,
  min = "0",
  max = "5000",
  step,
  addedMax = 0,
}) => {
  const [_value, _setValue] = React.useState(value);

  React.useEffect(() => {
    new RollCounterRange("#range2", step, addedMax);
  }, [addedMax]);

  return (
    <form>
      <input
        id="range2"
        name="range2"
        type="range"
        min={min}
        max={max + addedMax}
        value={_value}
        step={step}
        onChange={(e) => _setValue(e.target.value)}
        // onMouseUp={() => setValue(_value >= max ? max : _value)}
        onPointerUp={() => setValue(_value >= max ? max : _value)}
        // onWheel={(e) =>
        //   setValue(
        //     e.nativeEvent.wheelDelta > 0
        //       ? Number(value) + step <= Number(max)
        //         ? Number(value) + step
        //         : Number(max)
        //       : Number(value) - step >= Number(min)
        //         ? Number(value) - step
        //         : Number(min)
        //   )
        // }
      />
    </form>
  );
};

export default Range;
