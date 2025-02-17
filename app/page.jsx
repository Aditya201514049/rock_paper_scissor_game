
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import GameLogic from '@/components/GameLogic';
import Stats from '@/components/Stats'; // Import the Stats component

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [gameHistory, setGameHistory] = useState([]); // State to store game history
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        // If no user is signed in, redirect to the sign-in page
        router.push('/signin');
      } else {
        setUser(authUser);
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [router]);

  // Function to update game history with the final result of a game
  const updateGameHistory = (result) => {
    setGameHistory((prevHistory) => [...prevHistory, { result }]);
  };

  if (user === null) {
    return <div>Loading...</div>; // Optionally, show a loading state while checking auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
     
      <div className="w-full max-w-7xl flex gap-6">
       
        <div className="flex-1 w-[70%]">
          <GameLogic updateGameHistory={updateGameHistory} /> 
        </div>

     
        <div className="w-[30%]">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Game Stats</h2>
            <Stats gameHistory={gameHistory} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;



