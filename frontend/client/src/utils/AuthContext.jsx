import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when the app loads
  useEffect(() => {
    // Check localStorage or cookies for auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate token with your backend
      // For now, we'll just simulate a logged-in user
      setCurrentUser({
        username: 'Agent',
        email: 'agent@example.com',
        // other user data
      });
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    // Call your authentication API
    // For demo purposes:
    const user = { username: 'Agent', email };
    setCurrentUser(user);
    localStorage.setItem('authToken', 'demo-token');
    return user;
  };

  // Register function
  const register = async (username, email, password) => {
    // Call your registration API
    // For demo purposes:
    const user = { username, email };
    setCurrentUser(user);
    localStorage.setItem('authToken', 'demo-token');
    return user;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);