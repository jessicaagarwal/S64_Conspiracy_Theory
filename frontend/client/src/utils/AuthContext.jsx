import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, getUserProfile, updateUserProfile, deleteUser, loginAdmin } from './apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is logged in when the app loads
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      const adminToken = localStorage.getItem('adminToken');
      
      if (token) {
        try {
          // Validate token with backend
          const userData = await getUserProfile();
          setCurrentUser(userData);
          setIsAdmin(false);
        } catch (error) {
          console.error('Error verifying token:', error);
          // If token is invalid, remove it
          localStorage.removeItem('authToken');
        }
      }
      
      // Check if admin is logged in
      if (adminToken) {
        try {
          // For now, we'll just set isAdmin to true if the token exists
          // In a real app, you'd validate the token with the backend
          setIsAdmin(true);
          // Set admin data from localStorage if available
          const adminData = JSON.parse(localStorage.getItem('adminData'));
          if (adminData) {
            setCurrentAdmin(adminData);
          }
        } catch (error) {
          console.error('Error verifying admin token:', error);
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
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
      setIsAdmin(false);
      localStorage.setItem('authToken', userData.token);
      // Clear any admin data if it exists
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Admin login function
  const adminLogin = async (username, password) => {
    try {
      const adminData = await loginAdmin(username, password);
      setCurrentAdmin(adminData);
      setIsAdmin(true);
      localStorage.setItem('adminToken', adminData.token);
      localStorage.setItem('adminData', JSON.stringify(adminData));
      // Clear any user data if it exists
      localStorage.removeItem('authToken');
      setCurrentUser(null);
      return adminData;
    } catch (error) {
      console.error('Admin login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      const userData = await registerUser(username, email, password);
      setCurrentUser(userData);
      setIsAdmin(false);
      localStorage.setItem('authToken', userData.token);
      // Clear any admin data if it exists
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    if (isAdmin) {
      setCurrentAdmin(null);
      setIsAdmin(false);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
    } else {
      setCurrentUser(null);
      localStorage.removeItem('authToken');
    }
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
    currentAdmin,
    isAdmin,
    login,
    adminLogin,
    register,
    logout,
    updateUser,
    deleteUserAccount,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);