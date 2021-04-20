import logo from './logo.svg';
import './App.css';

import SpecsDisplay from './components/SpecsDisplay'
import Sandbox from './components/Sandbox'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        PTES Automation
      </header>
      {/*
      <Sandbox />
      */}
      <SpecsDisplay />
    </div>
  );
}

export default App;
