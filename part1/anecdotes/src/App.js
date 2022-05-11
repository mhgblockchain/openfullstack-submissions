// import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votesForSelected, setVotesForSelected] = useState(
    Array(anecdotes.length).fill(0)
  );
  const handleRandomNumber = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 0)));
  };
  const handleVotes = () => {
    const copy = [...votesForSelected];
    copy[selected] += 1;
    setVotesForSelected(copy);
  };

  console.log(votesForSelected);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      {votesForSelected[selected]}
      <br></br>
      <button onClick={handleVotes}>+</button>
      <button onClick={handleRandomNumber}>Next anecdote</button>

      <h1>Anecdote with the most votes</h1>
      {anecdotes[votesForSelected.indexOf(Math.max(...votesForSelected))]}
      <p>has {Math.max(...votesForSelected)} votes</p>
    </div>
  );
};

export default App;
