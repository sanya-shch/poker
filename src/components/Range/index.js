import React from "react";

import { RollCounterRange } from "./RollCounterRange";

import "./style.scss";

const Range = ({
  value: rangeValue = "25",
  min = "0",
  max = "5000",
  step = "25",
}) => {
  const [value, setValue] = React.useState(rangeValue);

  React.useEffect(() => {
    new RollCounterRange("#range2");
  }, []);

  React.useEffect(() => {
    setValue(rangeValue);
  }, [rangeValue]);

  return (
    <form>
      {/*<label htmlFor="range2">More Digits</label>*/}
      <input
        id="range2"
        name="range2"
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default Range;
