import React from 'react';
import logo from './logo.svg';
import logoName from './logo-name-m.svg';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoName} className="logoS" alt="logo" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Working on this app, stay tuned!
        </p>
        <a
          className="App-link"
          href="https://www.windows93.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Windows 93
        </a>
      </header>
    </div>
  );
}

export default App;
