'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import GameLogic from '@/components/GameLogic';
import Stats from '@/components/Stats';
import { useTheme } from '@/context/ThemeContext';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push('/signin');
      } else {
        setUser(authUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const updateGameHistory = (result) => {
    setGameHistory((prevHistory) => [...prevHistory, { result }]);
  };

  if (user === null) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 pt-20 flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl">
        <div className="w-full md:w-2/3">
          <GameLogic updateGameHistory={updateGameHistory} />
        </div>
        <div className="w-full md:w-1/3">
          <div className="card bg-base-100 shadow-xl p-6 h-full">
            <h2 className="text-2xl font-bold text-center font-serif card-title justify-center mb-4">Game Stats</h2>
            <Stats gameHistory={gameHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;



