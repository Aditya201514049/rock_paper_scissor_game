
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoundSelector from '@/components/RoundSelector';
import { auth } from '@/lib/firebase';
import { saveStatsToFirestore } from '@/lib/firebaseUtils'; // Import the Firestore update function

const moves = ['rock', 'paper', 'scissors'];

const GameLogic = () => {
  const [userMove, setUserMove] = useState('');
  const [computerMove, setComputerMove] = useState('');
  const [result, setResult] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [rounds, setRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // To ensure history is updated only once per complete game
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

    // If game has reached the designated number of rounds, finalize results
    if (newRound >= rounds) {
      // Since state updates are asynchronous, compute final scores manually:
      const finalUserScore = userScore + (roundResult === 'win' ? 1 : 0);
      const finalComputerScore = computerScore + (roundResult === 'lose' ? 1 : 0);

      let finalResult = '';
      if (finalUserScore > finalComputerScore) {
        finalResult = 'win';
      } else if (finalUserScore < finalComputerScore) {
        finalResult = 'lose';
      } else {
        finalResult = 'draw';
      }

      // Update Firestore with game stats if not already done for this game
      if (!hasUpdatedHistory.current) {
        // We update overall stats and append a history entry.
        saveStatsToFirestore({
          wins: finalResult === 'win' ? 1 : 0,
          losses: finalResult === 'lose' ? 1 : 0,
          draws: finalResult === 'draw' ? 1 : 0,
          gameHistory: [{
            result: finalResult,
            userScore: finalUserScore,
            computerScore: finalComputerScore,
            date: new Date()
          }]
        });
        hasUpdatedHistory.current = true;
      }

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
    hasUpdatedHistory.current = false; // Reset for next game
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
        <p className="mb-2 text-lg font-bold text-primary">
          Your Move: <span className="badge badge-outline">{userMove}</span>
        </p>
        <p className="mb-2 text-lg font-bold text-secondary">
          Computer's Move: <span className="badge badge-outline">{computerMove}</span>
        </p>
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
                <p className="text-2xl font-semibold text-center my-2">
                  You: {userScore} - Computer: {computerScore}
                </p>
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

