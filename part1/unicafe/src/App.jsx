import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value} {text == "positive" ? "%" : ""}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (type) => {
    switch (type) {
      case "good":
        setGood(prevGood => prevGood + 1);
        break;
      case "neutral":
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case "bad":
        setBad(prevBad => prevBad + 1);
        break;
      default:
        return;
    }
  };

  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positive = total ? (good / total) * 100 : 0;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick("good")} text={"good"} />
      <Button handleClick={() => handleClick("neutral")} text={"neutral"} />
      <Button handleClick={() => handleClick("bad")} text={"bad"} />
      <h1>statistics</h1>
      {total == 0 ? (
        "No feedback given"
      ) : (
        <>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={total} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positive} />
        </>
      )}
    </div>
  );
};

export default App;
