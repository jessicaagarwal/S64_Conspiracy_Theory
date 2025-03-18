// TrendingTheoriesPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const TrendingTheoriesPage = () => {
  const [trendingTheories, setTrendingTheories] = useState([]);
  const [timeFilter, setTimeFilter] = useState('week');
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTrendingTheories = async () => {
      try {
        // Mock data for demonstration
        const mockTrendingData = [
          { 
            id: 101, 
            title: 'The Great Reset Conspiracy', 
            content: 'How global elites are planning to reshape society through economic manipulation and digital surveillance...', 
            createdBy: 'user789', 
            likes: 2450, 
            shares: 876, 
            timestamp: new Date().toISOString() 
          },
          { 
            id: 102, 
            title: 'Area 51 Secrets Revealed', 
            content: 'Former employee speaks out about alien technology being reverse engineered in underground facilities...', 
            createdBy: 'user234', 
            likes: 1876, 
            shares: 543, 
            timestamp: new Date().toISOString() 
          },
          { 
            id: 103, 
            title: 'The Mandela Effect Explained', 
            content: 'Evidence suggests our collective false memories may be caused by timeline manipulation or parallel universe interference...', 
            createdBy: 'user567', 
            likes: 1654, 
            shares: 498, 
            timestamp: new Date().toISOString() 
          },
          { 
            id: 104, 
            title: 'Secret Antarctic Bases', 
            content: 'Satellite imagery reveals hidden facilities beneath the ice connected by tunnel networks with unusual thermal signatures...', 
            createdBy: 'user890', 
            likes: 1432, 
            shares: 387, 
            timestamp: new Date().toISOString() 
          },
          { 
            id: 105, 
            title: 'The Simulation Theory', 
            content: 'Physicists have discovered mathematical anomalies that suggest our reality is a computational construct with observable glitches...', 
            createdBy: 'user321', 
            likes: 1298, 
            shares: 356, 
            timestamp: new Date().toISOString() 
          }
        ];
        
        setTrendingTheories(mockTrendingData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching trending theories:', error);
        setIsLoading(false);
      }
    };

    fetchTrendingTheories();
  }, [timeFilter]);

  const handleSaveTheory = (theoryId) => {
    if (!currentUser) {
      alert('Please login to save theories');
      return;
    }
    
    alert(`Theory ${theoryId} saved to your collection!`);
  };

  const handleShareTheory = (theoryId) => {
    alert(`Share link for theory ${theoryId} copied to clipboard!`);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl title-font mb-8 text-center">
        <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
          Trending Conspiracy Theories
        </span>
      </h1>
      
      <div className="flex justify-end mb-6">
        <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center gap-2">
          <span className="text-gray-400 text-sm">Popular during:</span>
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-gray-700 text-gray-300 border-none rounded py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all-time">All Time</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {trendingTheories.map((theory, index) => (
          <div key={theory.id} className="theory-card bg-gray-800 rounded-xl p-6 shadow-lg gap-4">
            <div className="flex items-center mb-3 gap-2">
              <div className="mr-3 text-white rounded-lg px-3 py-1 text-sm font-medium">
                #{index + 1}
              </div>
              <h3 className="text-xl font-semibold">{theory.title}</h3>
            </div>
            
            <p className="text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: theory.content }}></p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm gap-2">
                <span className="flex items-center gap-1 mr-4 text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {theory.likes.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  {theory.shares.toLocaleString()}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleSaveTheory(theory.id)} 
                  className="btn-save px-4 py-2 rounded transition-colors"
                  disabled={!currentUser}
                >
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save
                  </span>
                </button>
                <button 
                  onClick={() => handleShareTheory(theory.id)} 
                  className="btn-share px-4 py-2 rounded transition-colors"
                >
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {trendingTheories.length === 0 && (
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-300">No trending theories found for the selected time period.</p>
        </div>
      )}
    </div>
  );
};

export default TrendingTheoriesPage;