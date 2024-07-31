import React, { useState } from 'react';

const Content = ({ darkMode }) => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (username.trim() === '') return;
    setError(null);
    setUserData(null);
    setRepos([]);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);

      const reposResponse = await fetch(data.repos_url);
      if (!reposResponse.ok) {
        throw new Error('Error fetching repositories');
      }
      const reposData = await reposResponse.json();
      setRepos(reposData.slice(0, 4).reverse());
    } catch (error) {
      setError(error.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <div className='row w-100 align-items-center'>
        <div className="col-12">
          <input
            type="text"
            className="inputGit"
            placeholder="Git nickname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className='btnGit' onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {error && (
        <div className='row'>
          <div className="col-12 output">
            <p className='error-message'>{error}</p>
          </div>
        </div>
      )}
      {userData && !error && (
        <div className='row'>
          <div className="col-12 output">
            <div className='row'>
              <h2>{userData.login}</h2>
            </div>
            <div className='row imgGit'>
              <img src={userData.avatar_url} alt={userData.login} width="100"/>
              <p>{userData.bio}</p>
            </div>
            
            {repos.length > 0 && (
              <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 repoGit'>
                <h3>Repositories</h3>
                <div className='row1'>
                {repos.slice(0, 2).map(repo => (
                  <div className="col repo" key={repo.id}>
                    <p>{repo.name}</p>
                  </div>
                ))}
                </div>
                
                <div className='row1'>
                {repos.slice(2, 4).map(repo => (
                  <div className="col repo" key={repo.id}>
                    <p>{repo.name}</p>
                  </div>
                ))}
                </div>
              </div>
              <div className='col-2'></div>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
