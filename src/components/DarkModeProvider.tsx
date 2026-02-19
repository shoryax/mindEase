'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: true,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());

    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    // Default to dark if no preference saved
    const shouldBeDark = saved === null ? true : saved === 'true';
    setIsDarkMode(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
