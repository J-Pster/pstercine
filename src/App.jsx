import React from 'react';
import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';

import { Filmes } from './pages';

import './App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Filmes />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
