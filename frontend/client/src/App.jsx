import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import './App.css';
import UserDashboard from './pages/UserDashboard';
import TrendingTheoriesPage from './pages/TrendingTheoriesPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          
          <Route path="/*" element={
            <>
              <Header />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/trending" element={<TrendingTheoriesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </div>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;