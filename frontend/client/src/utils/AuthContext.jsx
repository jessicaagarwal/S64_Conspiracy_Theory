import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, getUserProfile, updateUserProfile, deleteUser } from './apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when the app loads
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Validate token with backend
          const userData = await getUserProfile();
          setCurrentUser(userData);
        } catch (error) {
          console.error('Error verifying token:', error);
          // If token is invalid, remove it
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      setCurrentUser(userData);
      localStorage.setItem('authToken', userData.token);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      const userData = await registerUser(username, email, password);
      setCurrentUser(userData);
      localStorage.setItem('authToken', userData.token);
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
  };

  // Update user function
  const updateUser = async (userData) => {
    try {
      if (!currentUser) {
        throw new Error('No user is currently logged in');
      }
      
      const updatedUser = await updateUserProfile(currentUser._id, userData);
      setCurrentUser({
        ...currentUser,
        ...updatedUser
      });
      return updatedUser;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  // Delete user function
  const deleteUserAccount = async () => {
    try {
      if (!currentUser) {
        throw new Error('No user is currently logged in');
      }
      
      await deleteUser(currentUser._id);
      // After successful deletion, log out the user
      logout();
      return { success: true };
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUser,
    deleteUserAccount,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);