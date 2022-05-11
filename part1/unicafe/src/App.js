// import logo from "./logo.svg";
import { useState } from "react";

import "./App.css";

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <tr>
        <tbody>{text}</tbody>
        <tbody>{value.toPrecision(3)}</tbody>
      </tr>
    </div>
  );
};

const Statistics = ({ good, bad, neutral, average, positive }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <>No feedback given</>
      </div>
    );
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={positive} />
      </table>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    average: 0,
    positive: 0,
  });

  const handleGoodClick = () => {
    setClicks({
      ...clicks,
      good: clicks.good + 1,
      average:
        (clicks.good - clicks.bad) /
        (clicks.good + clicks.bad + clicks.neutral),
      positive:
        (clicks.good * 100) / (clicks.good + clicks.bad + clicks.neutral),
    });
  };

  const handleNeutralClick = () => {
    setClicks({
      ...clicks,
      neutral: clicks.neutral + 1,
      average:
        (clicks.good - clicks.bad) /
        (clicks.good + clicks.bad + clicks.neutral),
      positive:
        (clicks.good * 100) / (clicks.good + clicks.bad + clicks.neutral),
    });
  };

  const handleBadClick = () => {
    setClicks({
      ...clicks,
      bad: clicks.bad + 1,
      average:
        (clicks.good - clicks.bad) /
        (clicks.good + clicks.bad + clicks.neutral),
      positive:
        (clicks.good * 100) / (clicks.good + clicks.bad + clicks.neutral),
    });
  };

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button handleClick={handleGoodClick} text={"good"} />
      <Button handleClick={handleNeutralClick} text={"neutral"} />
      <Button handleClick={handleBadClick} text={"bad"} />

      <Statistics
        good={clicks.good}
        neutral={clicks.neutral}
        bad={clicks.bad}
        average={clicks.average}
        positive={clicks.positive}
      />
    </div>
  );
};

export default App;
