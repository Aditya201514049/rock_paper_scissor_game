'use client';

import { useState, useEffect } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useTheme } from '@/context/ThemeContext';

const Stats = () => {
  const [user, setUser] = useState(null);
  const [totalGames, setTotalGames] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);
  const [winRatio, setWinRatio] = useState(0);
  const { theme } = useTheme();

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
    <div className="w-full">
      <div className="stats stats-vertical shadow w-full">
        <div className="stat">
          <div className="stat-title">Total Games</div>
          <div className="stat-value text-primary">{totalGames}</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Wins</div>
          <div className="stat-value text-success">{wins}</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Losses</div>
          <div className="stat-value text-error">{losses}</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Draws</div>
          <div className="stat-value text-secondary">{draws}</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Win Ratio</div>
          <div className="stat-value text-accent">{winRatio}%</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;


