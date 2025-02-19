// app/context/ThemeContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Provider component that wraps children and manages theme state
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // On mount, read the saved theme from localStorage and apply it
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Whenever the theme changes, update localStorage and the document attribute
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the ThemeContext
export function useTheme() {
  return useContext(ThemeContext);
}
