import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          {/* Additional routes can be added here */}
          {/* <Route path="/saved" element={<SavedTheoriesPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;