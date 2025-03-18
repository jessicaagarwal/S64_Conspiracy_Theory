import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import TheoryDisplay from './TheoryDisplay';
import { generateTheory } from '../utils/theoryUtils';
import { createTheory } from '../utils/apiService';

const TheoryGenerator = ({ onNewTheory }) => {
  const [keywords, setKeywords] = useState('');
  const [theory, setTheory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendError, setBackendError] = useState(false);

  const handleGenerateTheory = async () => {
    setError('');
    setBackendError(false);
    setIsLoading(true);
    
    try {
      // Generate theory client-side
      console.log('Generating theory with keywords:', keywords);
      const generatedTheory = await generateTheory(keywords);
      console.log('Generated theory:', generatedTheory);
      
      // Try to save to backend
      try {
        console.log('Saving theory to backend...');
        // Prepare theory for backend
        const theoryForBackend = {
          title: generatedTheory.title,
          content: generatedTheory.content,
          tags: generatedTheory.keywords.map(keyword => keyword), // Convert keywords to tags
          likes: 0,
          shares: 0
        };
        
        // Save to backend
        const savedTheory = await createTheory(theoryForBackend);
        console.log('Theory saved to backend:', savedTheory);
        
        // Update state with saved theory
        setTheory(savedTheory);
        onNewTheory(savedTheory);
      } catch (backendErr) {
        console.error('Failed to save theory to backend:', backendErr);
        setBackendError(true);
        
        // Still use the client-side generated theory if backend fails
        setTheory(generatedTheory);
        onNewTheory(generatedTheory);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto mb-16 bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 title-font">Generate Your Theory</h3>
      
      <div className="mb-4">
        <label htmlFor="keywords" className="block text-sm font-medium mb-2">
          Enter Keywords (separated by commas)
        </label>
        <div className="flex gap-2">
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. aliens, government, technology"
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleGenerateTheory}
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed glow"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
      </div>
        {backendError && (
          <p className="mt-2 text-yellow-400 text-sm">
            Note: Theory was generated but could not be saved to the backend server.
          </p>
        )}
      {isLoading && <LoadingSpinner />}

      {theory && !isLoading && <TheoryDisplay theory={theory} />}
    </section>
  );
};

export default TheoryGenerator;