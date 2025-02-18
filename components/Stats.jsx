
'use client';

import { useState, useEffect } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Stats = () => {
  const [user, setUser] = useState(null);
  const [totalGames, setTotalGames] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);
  const [winRatio, setWinRatio] = useState(0);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const userStatsRef = doc(firestore, 'userStats', user.uid);
      const unsubscribe = onSnapshot(userStatsRef, (docSnap) => {
        if (docSnap.exists()) {
          const statsData = docSnap.data();
          const gameHistory = statsData.gameHistory || [];
          const total = gameHistory.length;
          const winsCount = gameHistory.filter((game) => game.result === 'win').length;
          const lossesCount = gameHistory.filter((game) => game.result === 'lose').length;
          const drawsCount = gameHistory.filter((game) => game.result === 'draw').length;
          setTotalGames(total);
          setWins(winsCount);
          setLosses(lossesCount);
          setDraws(drawsCount);
          setWinRatio(total > 0 ? ((winsCount / total) * 100).toFixed(2) : 0);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
      
      <p className="text-gray-700">
        Total Games: <span className="font-bold">{totalGames}</span>
      </p>
      <p className="text-green-600">
        Wins: <span className="font-bold">{wins}</span>
      </p>
      <p className="text-red-600">
        Losses: <span className="font-bold">{losses}</span>
      </p>
      <p className="text-gray-600">
        Draws: <span className="font-bold">{draws}</span>
      </p>
      <p className="text-blue-600">
        Win Ratio: <span className="font-bold">{winRatio}%</span>
      </p>
    </div>
  );
};

export default Stats;


