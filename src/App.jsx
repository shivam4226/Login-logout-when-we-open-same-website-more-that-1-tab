import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Headers from './Components/Header'
import Auth from './Components/Auth/Index';
import HomePage from './Components/HomePage'

function App() {
  return (
     <RecoilRoot>
    <Router>
    <Headers/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
    </Router>
    </RecoilRoot>
  );
}

export default App;
