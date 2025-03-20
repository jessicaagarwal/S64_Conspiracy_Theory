/**
 * API Service for communicating with the backend
 */

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Register a new user
 * @param {string} username - The username
 * @param {string} email - The email
 * @param {string} password - The password
 * @returns {Promise<Object>} The user object with token
 */
export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Login a user
 * @param {string} email - The email
 * @param {string} password - The password
 * @returns {Promise<Object>} The user object with token
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Get the authenticated user's profile
 * @returns {Promise<Object>} The user object
 */
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Update the user's profile
 * @param {string} id - The user ID
 * @param {Object} userData - The updated user data
 * @returns {Promise<Object>} The updated user object
 */
export const updateUserProfile = async (id, userData) => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Delete a user account
 * @param {string} id - The user ID to delete
 * @returns {Promise<Object>} The response from the server
 */
export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};

/**
 * Get user-specific theories
 * @returns {Promise<Array>} Array of theory objects
 */
export const getUserTheories = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/theories/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user theories:', error);
    throw error;
  }
};

/**
 * Fetch all theories from the backend
 * @returns {Promise<Array>} Array of theory objects
 */
export const fetchTheories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/theories`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching theories:', error);
    throw error;
  }
};

/**
 * Create a new theory in the backend
 * @param {Object} theory - The theory object to create
 * @returns {Promise<Object>} The created theory object
 */
export const createTheory = async (theory) => {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/theories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(theory),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating theory:', error);
    throw error;
  }
};

/**
 * Update a theory in the backend
 * @param {string} id - The ID of the theory to update
 * @param {Object} theory - The updated theory object
 * @returns {Promise<Object>} The updated theory object
 */
export const updateTheory = async (id, theory) => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/theories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(theory),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating theory:', error);
    throw error;
  }
};

/**
 * Delete a theory from the backend
 * @param {string} id - The ID of the theory to delete
 * @returns {Promise<Object>} The response from the server
 */
export const deleteTheory = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/theories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting theory:', error);
    throw error;
  }
};

/**
 * Login as an admin
 * @param {string} username - The admin username
 * @param {string} password - The admin password
 * @returns {Promise<Object>} The admin object with token
 */
export const loginAdmin = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admins/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in as admin:', error);
    throw error;
  }
};

/**
 * Get all users (admin only)
 * @returns {Promise<Array>} Array of user objects
 */
export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      throw new Error('No admin authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

/**
 * Get all theories by a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of theory objects
 */
export const getTheoriesByUser = async (userId) => {
  try {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}/theories/by-user/${userId}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user theories:', error);
    throw error;
  }
};

/**
 * Get all comments by a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of comment objects
 */
export const getCommentsByUser = async (userId) => {
  try {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}/comments/by-user/${userId}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user comments:', error);
    throw error;
  }
};

/**
 * Get all likes by a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of like objects
 */
export const getLikesByUser = async (userId) => {
  try {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}/likes/by-user/${userId}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user likes:', error);
    throw error;
  }
};

/**
 * Get all shares by a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of share objects
 */
export const getSharesByUser = async (userId) => {
  try {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}/shares/by-user/${userId}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user shares:', error);
    throw error;
  }
};

/**
 * Get all reports by a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of report objects
 */
export const getReportsByUser = async (userId) => {
  try {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}/reports/by-user/${userId}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user reports:', error);
    throw error;
  }
};

/**
 * Get all activity logs by a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of activity log objects
 */
export const getActivityLogsByUser = async (userId) => {
  try {
    const token = localStorage.getItem('adminToken');
    
    const response = await fetch(`${API_BASE_URL}/activity-logs/by-user/${userId}`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user activity logs:', error);
    throw error;
  }
};