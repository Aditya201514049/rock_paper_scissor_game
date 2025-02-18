
'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

const Stats = () => {
  const [totalGames, setTotalGames] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);
  const [winRatio, setWinRatio] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userStatsRef = doc(firestore, 'userStats', user.uid);

      const unsubscribe = onSnapshot(userStatsRef, (docSnap) => {
        if (docSnap.exists()) {
          const statsData = docSnap.data();
          setGameHistory(statsData.gameHistory || []);  // Assuming gameHistory is stored in Firestore
          
          // Update total games
          setTotalGames(statsData.gameHistory.length);

          // Calculate wins, losses, and draws
          const winsCount = statsData.gameHistory.filter((game) => game.result === 'win').length;
          const lossesCount = statsData.gameHistory.filter((game) => game.result === 'lose').length;
          const drawsCount = statsData.gameHistory.filter((game) => game.result === 'draw').length;

          setWins(winsCount);
          setLosses(lossesCount);
          setDraws(drawsCount);

          // Calculate win ratio
          if (statsData.gameHistory.length > 0) {
            const ratio = ((winsCount / statsData.gameHistory.length) * 100).toFixed(2);
            setWinRatio(ratio);
          } else {
            setWinRatio(0);
          }
        }
      });

      return () => unsubscribe(); // Cleanup on unmount
    }
  }, [user]);

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


