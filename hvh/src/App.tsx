import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cal from './pages/cal';
import Log from './pages/Log';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cal" element={<Cal />} />
          <Route path="/Log" element={<Log />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
