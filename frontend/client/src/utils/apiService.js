/**
 * API Service for communicating with the backend
 */

const API_BASE_URL = 'http://localhost:3000/api';

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
    const response = await fetch(`${API_BASE_URL}/theories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    const response = await fetch(`${API_BASE_URL}/theories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
    const response = await fetch(`${API_BASE_URL}/theories/${id}`, {
      method: 'DELETE',
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