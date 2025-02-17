
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import GameLogic from '@/components/GameLogic';

const HomePage = () => {
  const [user, setUser] = useState(null);
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

  if (user === null) {
    return <div>Loading...</div>; // Optionally, show a loading state while checking auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <GameLogic />
    </div>
  );
};

export default HomePage;
