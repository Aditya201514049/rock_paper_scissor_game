
'use client';

import { auth } from '@/lib/firebase';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
  // All hooks called unconditionally at the top
  const { theme, setTheme } = useTheme();
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

         {/* Theme controller */}
         <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            checked={theme === 'dark'}
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} // Toggle theme
          />
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        
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





