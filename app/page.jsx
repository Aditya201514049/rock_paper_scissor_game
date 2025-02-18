

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import GameLogic from '@/components/GameLogic';
import Stats from '@/components/Stats';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const router = useRouter();

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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6 mt-10">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl">
        <div className="w-full md:w-2/3">
          <GameLogic updateGameHistory={updateGameHistory} />
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center font-serif">Game Stats</h2>
            <Stats gameHistory={gameHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;



