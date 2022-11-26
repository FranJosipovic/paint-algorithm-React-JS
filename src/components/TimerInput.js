import { useLogic } from "../context/LogicContext";

const TimerInput = () => {
  const { time, setTime } = useLogic();

  const MAX = 10;

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(time * 100) / MAX}% 100%`,
    };
  };

  return (
    <input
      type="range"
      min="0"
      step={1}
      max={MAX}
      onChange={(e) => setTime(e.target.value)}
      style={getBackgroundSize()}
      value={time}
    />
  );
};

export default TimerInput;
