
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoundSelector from '@/components/RoundSelector';

const moves = ['rock', 'paper', 'scissors'];

const GameLogic = ({ updateGameHistory }) => {
  const [userMove, setUserMove] = useState('');
  const [computerMove, setComputerMove] = useState('');
  const [result, setResult] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [rounds, setRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Use a ref to track whether the game history has been updated
  const hasUpdatedHistory = useRef(false);

  const playGame = (move) => {
    if (gameOver) return;

    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    setUserMove(move);
    setComputerMove(randomMove);

    let roundResult = '';
    if (move === randomMove) {
      roundResult = 'draw';
      setResult("It's a draw!");
    } else if (
      (move === 'rock' && randomMove === 'scissors') ||
      (move === 'paper' && randomMove === 'rock') ||
      (move === 'scissors' && randomMove === 'paper')
    ) {
      roundResult = 'win';
      setResult("You win!");
      setUserScore((prev) => prev + 1);
    } else {
      roundResult = 'lose';
      setResult("You lose!");
      setComputerScore((prev) => prev + 1);
    }

    const newRound = currentRound + 1;
    setCurrentRound(newRound);

    if (newRound >= rounds) {
      // Determine the final result of the game
      let finalResult = '';
      if (userScore + (roundResult === 'win' ? 1 : 0) > computerScore + (roundResult === 'lose' ? 1 : 0)) {
        finalResult = 'win';
      } else if (userScore + (roundResult === 'win' ? 1 : 0) < computerScore + (roundResult === 'lose' ? 1 : 0)) {
        finalResult = 'lose';
      } else {
        finalResult = 'draw';
      }

      // Update game history with the final result (only once!)
      if (!hasUpdatedHistory.current) {
        updateGameHistory(finalResult);
        hasUpdatedHistory.current = true; // Mark as updated
      }

      // End the game
      setGameOver(true);
      setShowModal(true);
    }
  };

  const getFinalResult = () => {
    if (userScore > computerScore) return "🎉 You Win!";
    if (userScore < computerScore) return "😢 You Lose!";
    return "🤝 It's a Draw!";
  };

  const resetGame = () => {
    setUserScore(0);
    setComputerScore(0);
    setUserMove('');
    setComputerMove('');
    setResult('');
    setCurrentRound(0);
    setGameOver(false);
    setShowModal(false);
    hasUpdatedHistory.current = false; // Reset the ref when the game restarts
  };

  return (
    <div className="bg-base-200 p-8 rounded-lg shadow-lg w-full">
      <h1 className="text-4xl font-bold text-center mb-6 text-primary">Rock Paper Scissors</h1>

      <RoundSelector onSelectRounds={setRounds} />

      <div className="text-center my-4">
        <p className="text-lg font-semibold">
          Round <span className="badge badge-info">{currentRound}</span> / {rounds}
        </p>
      </div>

      <div className="flex justify-around mb-6">
        <button className="btn btn-primary btn-lg" onClick={() => playGame('rock')} disabled={gameOver}>
          ✊ Rock
        </button>
        <button className="btn btn-secondary btn-lg" onClick={() => playGame('paper')} disabled={gameOver}>
          ✋ Paper
        </button>
        <button className="btn btn-accent btn-lg" onClick={() => playGame('scissors')} disabled={gameOver}>
          ✌️ Scissors
        </button>
      </div>

      <div className="text-center my-4">
        <p className="mb-2 text-lg font-bold text-primary">Your Move: <span className="badge badge-outline">{userMove}</span></p>
        <p className="mb-2 text-lg font-bold text-secondary">Computer's Move: <span className="badge badge-outline">{computerMove}</span></p>
        <h2 className="text-2xl font-semibold mt-4 text-success">{result}</h2>
      </div>

      <div className="text-center my-4">
        <p className="text-xl font-bold text-info">Your Score: {userScore}</p>
        <p className="text-xl font-bold text-error">Computer's Score: {computerScore}</p>
      </div>

      <div className="text-center">
        <button className="btn btn-warning btn-wide" onClick={resetGame}>Restart Game</button>
      </div>

     
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="modal modal-open">
              <div className="modal-box">
                <h2 className="text-3xl font-bold text-center mb-4">{getFinalResult()}</h2>
                <p className="text-lg text-center">Final Score:</p>
                <p className="text-2xl font-semibold text-center my-2">You: {userScore} - Computer: {computerScore}</p>
                <div className="modal-action">
                  <button className="btn btn-primary btn-wide" onClick={resetGame}>Play Again</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameLogic;



// components/GameLogic.jsx

/*
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoundSelector from '@/components/RoundSelector';
import { saveStatsToFirestore } from '@/lib/firebaseUtils'; // Importing the function

const moves = ['rock', 'paper', 'scissors'];

const GameLogic = ({ updateGameHistory }) => {
  // State variables
  const [userMove, setUserMove] = useState('');
  const [computerMove, setComputerMove] = useState('');
  const [result, setResult] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [rounds, setRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const playGame = (move) => {
    if (gameOver) return;

    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    setUserMove(move);
    setComputerMove(randomMove);

    let roundResult = '';
    if (move === randomMove) {
      roundResult = 'draw';
      setResult("It's a draw!");
    } else if (
      (move === 'rock' && randomMove === 'scissors') ||
      (move === 'paper' && randomMove === 'rock') ||
      (move === 'scissors' && randomMove === 'paper')
    ) {
      roundResult = 'win';
      setResult("You win!");
      setUserScore((prev) => prev + 1);
    } else {
      roundResult = 'lose';
      setResult("You lose!");
      setComputerScore((prev) => prev + 1);
    }

    const newRound = currentRound + 1;
    setCurrentRound(newRound);

    if (newRound >= rounds) {
      // Determine the final result of the game
      let finalResult = '';
      if (userScore + (roundResult === 'win' ? 1 : 0) > computerScore + (roundResult === 'lose' ? 1 : 0)) {
        finalResult = 'win';
      } else if (userScore + (roundResult === 'win' ? 1 : 0) < computerScore + (roundResult === 'lose' ? 1 : 0)) {
        finalResult = 'lose';
      } else {
        finalResult = 'draw';
      }

      // Update game history with the final result (only once!)
      updateGameHistory(finalResult);

      // Save stats to Firestore
      saveStatsToFirestore({
        wins: roundResult === 'win' ? 1 : 0,
        losses: roundResult === 'lose' ? 1 : 0,
        draws: roundResult === 'draw' ? 1 : 0,
      });

      // End the game
      setGameOver(true);
      setShowModal(true);
    }
  };

  // Reset game logic
  const resetGame = () => {
    setUserScore(0);
    setComputerScore(0);
    setUserMove('');
    setComputerMove('');
    setResult('');
    setCurrentRound(0);
    setGameOver(false);
    setShowModal(false);
  };

  return (
    <div className="bg-base-200 p-8 rounded-lg shadow-lg w-full">
      <div className="flex justify-center mb-6">
        <div className="text-2xl font-bold">Rock Paper Scissors Game</div>
      </div>
      <div className="flex justify-center gap-8 mb-8">
        <button onClick={() => playGame('rock')} className="btn btn-primary">Rock</button>
        <button onClick={() => playGame('paper')} className="btn btn-secondary">Paper</button>
        <button onClick={() => playGame('scissors')} className="btn btn-accent">Scissors</button>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold">Your Move: {userMove}</h2>
        <h2 className="text-xl font-semibold">Computer's Move: {computerMove}</h2>
        <h2 className="text-lg font-semibold">Result: {result}</h2>
        <h3 className="text-lg font-semibold">Score: You {userScore} - Computer {computerScore}</h3>
      </div>

      {gameOver && (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold">Game Over!</h2>
          <h3 className="text-xl font-semibold">
            {userScore > computerScore ? "You Win!" : userScore < computerScore ? "You Lose!" : "It's a Draw!"}
          </h3>
          <button onClick={resetGame} className="btn btn-neutral mt-4">Play Again</button>
        </div>
      )}
    </div>
  );
};

export default GameLogic;
*/

