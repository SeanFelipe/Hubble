import logo from './logo.svg';
import './App.css';

import SpecsDisplay from './components/SpecsDisplay'
import Sandbox from './components/Sandbox'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="100" height="100"/>
      </header>
      {/*
      <Sandbox />
      */}
      <SpecsDisplay />
    </div>
  );
}

export default App;
