import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin
  : 'http://localhost:3001';

function App() {
  const [username, setUsername] = useState('');
  const [assignedCharacter, setAssignedCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [isExisting, setIsExisting] = useState(false);
  const [isRoleVisible, setIsRoleVisible] = useState(false);
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [cluePasscode, setCluePasscode] = useState('');
  const [isClueVisible, setIsClueVisible] = useState(false);
  const [clueError, setClueError] = useState('');

  // Check for username in URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlUsername = params.get('username');
    
    if (urlUsername) {
      setUsername(urlUsername);
      fetchCharacter(urlUsername);
    }
  }, []);

  const fetchCharacter = async (name) => {
    try {
      const response = await fetch(`${API_URL}/api/roles/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }

      setAssignedCharacter(data.character);
      setIsExisting(data.isExisting);

      // Immediately show role if it's a new assignment
      if (!data.isExisting) {
        setIsRoleVisible(true);
      }

      setError(null);
    } catch (err) {
      setError(err.message);
      setAssignedCharacter(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update URL with username
    const url = new URL(window.location);
    url.searchParams.set('username', username);
    window.history.pushState({}, '', url);
    
    await fetchCharacter(username);
  };

  const verifyCluePasscode = async () => {
    try {
      const response = await fetch(`${API_URL}/api/roles/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: username,
          passcode: cluePasscode 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }

      setAssignedCharacter(prev => ({
        ...prev,
        clues: data.clue
      }));
      setIsClueVisible(true);
      setClueError('');
    } catch (err) {
      setClueError(err.message);
    }
  };

  return (
    <div className="App">
      <div className="spooky-container">
        <h1 className="spooky-title">Welcome to Shadowmoor</h1>
        {
          !isRoleVisible && (
            <div className="assignment-form">
              {!assignedCharacter ? (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name..."
                    required
                    className="spooky-input"
                  />
                  <button type="submit" className="spooky-button">
                    Reveal Your Character
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setIsRoleVisible(true)} 
                  className="spooky-button"
                >
                  {isExisting ? 
                    `"${username}" is already assigned. Click here to see your role again` : 
                    'Click to view your role again'}
                </button>
              )}
            </div>
          )
        }

        {error && <div className="error-message">{error}</div>}
        
        {assignedCharacter && isRoleVisible && (
          <div className="character-card">
            <h2 className="character-title">You are {assignedCharacter.name}</h2>
            <div className="character-info">
              <p><span>Name:</span> {assignedCharacter.name}</p>
              <p><span>Role:</span> {assignedCharacter.role}</p>
              <p><span>Backstory:</span> {assignedCharacter.backstory}</p>
              <p><span>Objectives:</span> {assignedCharacter.objectives}</p>
              <p><span>Relationships:</span> {assignedCharacter.relationships}</p>
            </div>
            <div className="secret-scroll">
              <div 
                className="secret-header" 
                onClick={() => setIsSecretVisible(!isSecretVisible)}
              >
                <h3>🤫 Your Secret Information</h3>
                <span className={`arrow ${isSecretVisible ? 'open' : ''}`}>
                  Click to {!isSecretVisible ? 'Show' : 'Hide'}
                </span>
              </div>
              <div className={`secret-content ${isSecretVisible ? 'visible' : ''}`}>
                <p><span>Secrets:</span> {assignedCharacter.secrets}</p>
                <div className="clue-section">
                  <p><span>Clues:</span></p>
                  {!isClueVisible ? (
                    <div className="clue-verification">
                      <input
                        type="text"
                        maxLength="4"
                        value={cluePasscode}
                        onChange={(e) => setCluePasscode(e.target.value)}
                        placeholder="Enter 4-digit code"
                        className="clue-input"
                      />
                      <button onClick={verifyCluePasscode} className="verify-button">
                        Verify Code
                      </button>
                      {clueError && <p className="error-message">{clueError}</p>}
                    </div>
                  ) : (
                    <p>{assignedCharacter.clues}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
