

'use client';

import { auth } from '@/lib/firebase';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
          {user ? (
            <div className="flex flex-col md:flex-row items-center gap-4">
              <button
                onClick={() => {
                  router.push('/');
                  setIsMenuOpen(false);
                }}
                className={getButtonClasses('/')}
              >
                Game
              </button>
              <button
                onClick={() => {
                  router.push('/leaderboard');
                  setIsMenuOpen(false);
                }}
                className={getButtonClasses('/leaderboard')}
              >
                Leaderboard
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="btn btn-ghost hover:underline flex items-center"
                >
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  Profile
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                    <button
                      onClick={() => {
                        router.push('/profile');
                        setIsDropdownOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsDropdownOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
