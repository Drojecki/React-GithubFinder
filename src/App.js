import React, { useState, useEffect } from 'react';
import GitFinder from './Header';
import Content from './Content';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const data = window.localStorage.getItem('DARK_MODE');
      return data !== null ? JSON.parse(data) : false;
    } catch (error) {
      console.error('Failed to parse DARK_MODE from localStorage:', error);
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('DARK_MODE', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Failed to save DARK_MODE to localStorage:', error);
    }
  }, [darkMode]);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='row'>
        <div className='col header'>
          <GitFinder />
        </div>
      </div>
      <div className='row header'>
        <div className='col'>
          <button className='btnGit' onClick={() => setDarkMode(prevMode => !prevMode)}>
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 content'>
          <Content darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;
