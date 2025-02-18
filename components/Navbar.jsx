
'use client';

import { auth } from '@/lib/firebase';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  // All hooks called unconditionally at the top
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  // Conditional return AFTER all hooks
  if (pathname === '/signin') {
    return (
      <div className="fixed top-0 left-0 w-full h-0 bg-gray-100 z-50" />
    );
  }

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

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="text-white focus:outline-none z-50 p-2"
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

          {isMenuOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-40 border border-gray-700"
            >
              <div className="flex flex-col p-2 space-y-2">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        router.push('/');
                        setIsMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                    >
                      Game
                    </button>
                    <button
                      onClick={() => {
                        router.push('/leaderboard');
                        setIsMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                    >
                      Leaderboard
                    </button>
                    <button
                      onClick={() => {
                        router.push('/profile');
                        setIsMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                    >
                      Sign Out
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex w-full md:w-auto">
          {user && (
            <div className="flex items-center gap-4">
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
              <div className="relative" ref={dropdownRef}>
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
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                    <button
                      onClick={() => {
                        router.push('/profile');
                        setIsDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;