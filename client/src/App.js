import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [assignedCharacter, setAssignedCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [isExisting, setIsExisting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/roles/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }

      setAssignedCharacter(data.character);
      setIsExisting(data.isExisting);
      setError(null);
    } catch (err) {
      setError(err.message);
      setAssignedCharacter(null);
    }
  };

  return (
    <div className="App">
      <div className="spooky-container">
        <h1 className="spooky-title">Welcome to Shadowmoor</h1>
        <div className="assignment-form">
          {!assignedCharacter ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username..."
                required
                className="spooky-input"
              />
              <button type="submit" className="spooky-button">
                Reveal Your Character
              </button>
            </form>
          ) : (
            <button 
              onClick={handleSubmit} 
              className="spooky-button"
            >
              {isExisting ? 
                `${username} is already assigned. Click here to see your role again` : 
                'Click to view your role again'}
            </button>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}
        
        {assignedCharacter && (
          <div className="character-card">
            <h2 className="character-title">Your Role in Tonight's Mystery</h2>
            <div className="character-info">
              <p><span>Name:</span> {assignedCharacter.name}</p>
              <p><span>Role:</span> {assignedCharacter.role}</p>
              <p><span>Backstory:</span> {assignedCharacter.backstory}</p>
              <p><span>Objectives:</span> {assignedCharacter.objectives}</p>
              <p><span>Relationships:</span> {assignedCharacter.relationships}</p>
            </div>
            <div className="secret-scroll">
              <h3>🤫 Secret Information</h3>
              <div className="secret-content">
                <p><span>Secrets:</span> {assignedCharacter.secrets}</p>
                <p><span>Clues:</span> {assignedCharacter.clues}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
