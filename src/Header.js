
import React from 'react';

const GitFinder = ({ darkMode }) => {
  return (
    <div className={`row ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='col-12'>
        <h1>Git Finder</h1>
      </div>
    </div>
  );
};

export default GitFinder;

