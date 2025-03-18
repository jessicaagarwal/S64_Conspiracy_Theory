import React, { useState, useEffect } from 'react';
import TheoryGenerator from '../components/TheoryGenerator';
import RecentTheories from '../components/RecentTheories';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchTheories } from '../utils/apiService';

const HomePage = () => {
  console.log('HomePage component rendering');
  
  const [theories, setTheories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    console.log('HomePage useEffect running');
    
    const loadTheories = async () => {
      try {
        console.log('Fetching theories from backend...');
        setLoading(true);
        
        // Add a timeout to the fetch request
        const fetchWithTimeout = async () => {
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Backend request timed out')), 5000)
          );
          
          return Promise.race([fetchTheories(), timeoutPromise]);
        };
        
        const backendTheories = await fetchWithTimeout();
        console.log('Successfully fetched theories from backend:', backendTheories);
        setTheories(backendTheories);
        setUsingMockData(false);
        setError('');
      } catch (err) {
        console.error('Failed to fetch theories from backend:', err);
        
        // Show error message when backend is unavailable
        setTheories([]);
        setUsingMockData(true);
        setError('Backend server is unavailable. Please make sure the server is running and try again.');
      } finally {
        setLoading(false);
        console.log('Loading state set to false');
      }
    };

    loadTheories();
  }, []);

  const handleNewTheory = (newTheory) => {
    console.log('New theory generated:', newTheory);
    setTheories(prev => [newTheory, ...prev]);
  };

  console.log('HomePage render - current state:');
  console.log('- loading:', loading);
  console.log('- theories length:', theories.length);
  console.log('- usingMockData:', usingMockData);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4 title-font text-shadow">Uncover the "Truth" Hidden in Plain Sight</h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Generate absurd conspiracy theories with our AI-powered generator. Connect dots that don't exist!
        </p>
      </section>

      {/* Generator Section */}
      <TheoryGenerator onNewTheory={handleNewTheory} />

      {/* Recent Theories */}
      {loading ? (
        <div className="flex justify-center my-12">
          <LoadingSpinner />
          <p className="ml-2 text-gray-400">Loading theories...</p>
        </div>
      ) : (
        <>
          {usingMockData && (
            <div className="text-center text-yellow-400 my-4 p-2 bg-gray-800 rounded">
              {error}
            </div>
          )}
          {!usingMockData && theories.length === 0 && (
            <div className="text-center text-gray-400 my-4">
              No theories found. Generate your first theory above!
            </div>
          )}
          <RecentTheories theories={theories} />
        </>
      )}
    </main>
  );
};

export default HomePage;