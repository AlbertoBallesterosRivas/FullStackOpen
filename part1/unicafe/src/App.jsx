import { useState } from "react";

// a proper place to define a component
const Statistics = ({ statisticName, statisticValue }) => {
  return (
    <p>
      {statisticName} {statisticValue} {statisticName == "positive" ? "%" : ""}
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
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
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
      <button onClick={() => handleClick("good")}>good</button>
      <button onClick={() => handleClick("neutral")}>neutral</button>
      <button onClick={() => handleClick("bad")}>bad</button>
      <h1>statistics</h1>
      {total == 0 ? (
        "No feedback given"
      ) : (
        <>
          <Statistics statisticName={"good"} statisticValue={good} />
          <Statistics statisticName={"neutral"} statisticValue={neutral} />
          <Statistics statisticName={"bad"} statisticValue={bad} />
          <Statistics statisticName={"all"} statisticValue={total} />
          <Statistics statisticName={"average"} statisticValue={average} />
          <Statistics statisticName={"positive"} statisticValue={positive} />
        </>
      )}
    </div>
  );
};

export default App;
