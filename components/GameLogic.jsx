'use client';

import { useState } from 'react';

const moves = ['rock', 'paper', 'scissors'];

const GameLogic = () => {
  const [userMove, setUserMove] = useState('');
  const [computerMove, setComputerMove] = useState('');
  const [result, setResult] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const playGame = (move) => {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    setUserMove(move);
    setComputerMove(randomMove);

    if (move === randomMove) {
      setResult("It's a draw!");
    } else if (
      (move === 'rock' && randomMove === 'scissors') ||
      (move === 'paper' && randomMove === 'rock') ||
      (move === 'scissors' && randomMove === 'paper')
    ) {
      setResult("You win!");
      setUserScore((prevScore) => prevScore + 1);
    } else {
      setResult("You lose!");
      setComputerScore((prevScore) => prevScore + 1);
    }
  };

  const resetScores = () => {
    setUserScore(0);
    setComputerScore(0);
    setUserMove('');
    setComputerMove('');
    setResult('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Rock Paper Scissors</h1>
      <div className="flex justify-around mb-4">
        <button className="btn btn-primary" onClick={() => playGame('rock')}>Rock</button>
        <button className="btn btn-secondary" onClick={() => playGame('paper')}>Paper</button>
        <button className="btn btn-accent" onClick={() => playGame('scissors')}>Scissors</button>
      </div>
      <div className="text-center mb-4">
        <p className="mb-2"><span className="font-bold">Your move:</span> {userMove}</p>
        <p className="mb-2"><span className="font-bold">Computer's move:</span> {computerMove}</p>
        <h2 className="text-xl font-semibold mt-4">{result}</h2>
      </div>
      <div className="text-center mb-4">
        <p className="text-lg"><span className="font-bold">Your Score:</span> {userScore}</p>
        <p className="text-lg"><span className="font-bold">Computer's Score:</span> {computerScore}</p>
      </div>
      <div className="text-center">
        <button className="btn btn-warning" onClick={resetScores}>Reset Scores</button>
      </div>
    </div>
  );
};

export default GameLogic;
