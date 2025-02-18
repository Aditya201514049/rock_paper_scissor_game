
'use client';

import { auth } from '@/lib/firebase';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/signin'); // Redirect to the sign-in page after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Helper function to generate active classes
  const getButtonClasses = (path) => {
    return `btn ${pathname === path ? 'btn-primary' : 'btn-ghost'} hover:underline`;
  };

  return (
    <nav className="bg-gray-800 text-white p-2 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push('/')}
        >
          Rock Paper Scissors
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={() => router.push('/')}
                className={getButtonClasses('/')}
              >
                Game
              </button>

              <button
                onClick={() => router.push('/leaderboard')}
                className={getButtonClasses('/leaderboard')}
              >
                Leaderboard
              </button>
              <button
                onClick={() => router.push('/profile')}
                className={getButtonClasses('/profile')}
              >
                Profile
              </button>

              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => router.push('/profile')}
              />
              <button
                onClick={handleSignOut}
                className="btn bg-red-500 px-3 py-1 rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
