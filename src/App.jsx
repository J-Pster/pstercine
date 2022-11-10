import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Navigate, Route, Routes, useLocation,
} from 'react-router-dom';

import { Filmes, SingularFilme } from './pages';
import './App.scss';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/filmes" />} />
        <Route path="/filmes">
          <Route index element={<Filmes />} />
          <Route path=":id" element={<SingularFilme />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
