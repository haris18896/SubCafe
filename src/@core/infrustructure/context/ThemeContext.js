import React, {createContext, useContext, useState, useEffect} from 'react';

// ** hooks
import {showToast} from '../../../utils/utils';
import {getData, setData} from '../../../utils/constants';

// Create a context for the theme
export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeToggleProvider = ({children}) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await getData('theme');

        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (err) {
        showToast({
          title: 'Load theme',
          message: err,
          type: 'error',
        });
      }
    }

    loadTheme().then();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await setData('theme', newTheme);
    } catch (err) {
      showToast({
        title: 'Load theme',
        message: err,
        type: 'error',
      });
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
