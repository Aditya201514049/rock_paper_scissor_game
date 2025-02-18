

'use client';

import { useState, useEffect } from 'react';

const Stats = ({ gameHistory }) => {
  const [totalGames, setTotalGames] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);
  const [winRatio, setWinRatio] = useState(0);

  useEffect(() => {
    // Calculate total games
    setTotalGames(gameHistory.length);

    // Calculate wins, losses, and draws
    const winsCount = gameHistory.filter((game) => game.result === 'win').length;
    const lossesCount = gameHistory.filter((game) => game.result === 'lose').length;
    const drawsCount = gameHistory.filter((game) => game.result === 'draw').length;

    setWins(winsCount);
    setLosses(lossesCount);
    setDraws(drawsCount);

    // Calculate win ratio
    if (gameHistory.length > 0) {
      const ratio = ((winsCount / gameHistory.length) * 100).toFixed(2);
      setWinRatio(ratio);
    } else {
      setWinRatio(0);
    }
  }, [gameHistory]); // Re-run when gameHistory changes

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Game Stats</h2>
      <p className="text-gray-700">Total Games: <span className="font-bold">{totalGames}</span></p>
      <p className="text-green-600">Wins: <span className="font-bold">{wins}</span></p>
      <p className="text-red-600">Losses: <span className="font-bold">{losses}</span></p>
      <p className="text-gray-600">Draws: <span className="font-bold">{draws}</span></p>
      <p className="text-blue-600">Win Ratio: <span className="font-bold">{winRatio}%</span></p>
    </div>
  );
};

export default Stats;





