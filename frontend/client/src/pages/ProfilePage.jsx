import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { currentUser, updateUser, deleteUserAccount } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    
    // Initialize profile data with current user info
    setProfileData({
      username: currentUser.username || '',
      email: currentUser.email || '',
      password: ''
    });
  }, [currentUser, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');
      
      const userData = { ...profileData };
      // Only include password if it was provided
      if (!userData.password) delete userData.password;
      
      await updateUser(userData);
      setSuccessMessage('Profile updated successfully');
      
      // Clear password field after successful update
      setProfileData({
        ...profileData,
        password: ''
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      setError('');
      await deleteUserAccount();
      navigate('/auth');
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to delete account. Please try again.');
      setShowDeleteConfirm(false);
      setIsLoading(false);
    }
  };

  if (isLoading && !currentUser) return <LoadingSpinner />;

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center w-full">
        <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
          Account Settings
        </span>
      </h1>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-900 text-green-200 p-4 rounded-lg mb-6 text-center">
          {successMessage}
        </div>
      )}
      
      <div className="bg-gray-800 rounded-xl p-8 shadow-lg mb-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-400 text-center">Profile Information</h2>
        
        <form onSubmit={handleUpdateProfile} className="space-y-6 flex flex-col items-center">
          <div className="w-full text-center">
            <label className="block text-gray-300 text-sm mb-2 text-center" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full bg-gray-700 p-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={profileData.username}
              onChange={(e) => setProfileData({...profileData, username: e.target.value})}
              required
            />
          </div>
          
          <div className="w-full text-center">
            <label className="block text-gray-300 text-sm mb-2 text-center" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full bg-gray-700 p-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="w-full text-center">
            <label className="block text-gray-300 text-sm mb-2 text-center" htmlFor="password">
              New Password (leave blank to keep current)
            </label>
            <input
              id="password"
              type="password"
              className="w-full bg-gray-700 p-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={profileData.password}
              onChange={(e) => setProfileData({...profileData, password: e.target.value})}
              placeholder="••••••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Updating...</span>
              </span>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </form>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-8 shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-red-400 text-center">Account Deletion</h2>
        <p className="text-gray-300 mb-6 text-center">
          Deleting your account will permanently remove all your data, including your profile, theories, and activity history. This action cannot be undone.
        </p>
        
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full max-w-xs mx-auto block bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-4 rounded-lg transition-all"
          >
            Delete Account
          </button>
        ) : (
          <div className="bg-gray-750 border border-red-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-300 mb-4 text-center">Are you sure you want to delete your account?</h3>
            <p className="text-gray-300 mb-6 text-center">
              This action is permanent and cannot be reversed. All your data will be lost.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium py-3 px-4 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-4 rounded-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Yes, Delete My Account"}
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center w-full">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-indigo-400 hover:text-indigo-300 font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;