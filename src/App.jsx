import React from 'react';
import logo from './logo.svg';
import logoName from './logo-name-m.svg';
import './App.css';
import Button from './components/Button';
import Dropdown from './components/Dropdown';
import Input from './components/Input';
import Map from './components/Map';

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
      <Dropdown entries={['Infraestructura', 'Movilidad']}/>
      <Button
        primary
        onClick={() => console.log('Click')}
      >
        Button
      </Button>
      <Input
        label="Label"
        placeholder="Placeholder"
        textarea
      />
      <Map />
    </div>
  );
}

export default App;
