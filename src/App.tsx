import React from 'react';
import {
  Header,
  Weather,
} from "./components";
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Weather />
    </div>
  );
};

export default App;
