import React from 'react';
import Paths from './paths';
import "./assets/css/global.css";
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Paths />
      </div>
    </>
  );
}

export default App;
