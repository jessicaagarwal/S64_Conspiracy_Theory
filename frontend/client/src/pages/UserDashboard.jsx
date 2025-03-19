// UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { getUserTheories, deleteTheory } from '../utils/apiService';
import LoadingSpinner from '../components/LoadingSpinner';

const UserDashboard = () => {
  const [userTheories, setUserTheories] = useState([]);
  const [savedTheories, setSavedTheories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    const fetchUserContent = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        // Fetch user's theories from the backend
        const theories = await getUserTheories();
        setUserTheories(theories);
        
        // For now, we'll keep using mock data for saved theories
        // In a real app, you would have an API endpoint for saved/liked theories
        const userSavedTheories = [
          { id: 3, title: 'Ancient Aliens', content: 'The pyramids show evidence of extraterrestrial technology beyond what ancient humans should have possessed...', createdBy: 'user123', likes: 120, shares: 67 },
          { id: 4, title: 'The Illuminati', content: 'Tracing the secret society through history reveals connections to global financial institutions...', createdBy: 'user456', likes: 89, shares: 31 }
        ];
        
        setSavedTheories(userSavedTheories);
      } catch (error) {
        console.error('Error fetching user content:', error);
        setError('Failed to load your theories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserContent();
  }, [currentUser, navigate]);

  const handleDeleteTheory = async (id, isUserGenerated = true) => {
    try {
      if (isUserGenerated) {
        // Delete the theory from the backend
        await deleteTheory(id);
        // Update the state after successful deletion
        setUserTheories(userTheories.filter(theory => theory._id !== id));
      } else {
        // For saved theories (mock data for now)
        setSavedTheories(savedTheories.filter(theory => theory.id !== id));
      }
    } catch (error) {
      console.error('Error deleting theory:', error);
      setError('Failed to delete theory. Please try again later.');
    }
  };

  const handleEditTheory = (id) => {
    navigate(`/edit-theory/${id}`);
  };

  const handleShareTheory = (id) => {
    // In a real app, this would open sharing options or call a share API
    alert(`Theory with ID ${id} shared!`);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl title-font mb-8 text-center">
        <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
          Your Conspiracy Dashboard
        </span>
      </h1>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Your Theories</h2>
        {userTheories.length > 0 ? (
          <div className="space-y-3">
            {userTheories.map(theory => (
              <div key={theory._id} className="theory-card bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{theory.title}</h3>
                <p className="text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: theory.content }}></p>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                <div className='flex items-center gap-2'>
                  <span className="flex items-center gap-1 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {theory.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {theory.shares}
                  </span>
                </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditTheory(theory._id)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTheory(theory._id)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded transition-colors">
                    Delete
                  </button>
                  <button onClick={() => handleShareTheory(theory._id)} className="btn-share px-4 py-2 rounded transition-colors">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-300">You haven't created any theories yet.</p>
            <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-gray-100 rounded-lg transition-all">
              Generate a Theory
            </button>
          </div>
        )}
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Saved Theories</h2>
        {savedTheories.length > 0 ? (
          <div className="space-y-3">
            {savedTheories.map(theory => (
              <div key={theory.id} className="theory-card bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{theory.title}</h3>
                <p className="text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: theory.content }}></p>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                <div className='flex items-center gap-2'>
                  <span className="flex items-center gap-1 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {theory.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {theory.shares}
                  </span>
                </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDeleteTheory(theory.id, false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded transition-colors">
                    Remove
                  </button>
                  <button onClick={() => handleShareTheory(theory.id)} className="btn-share px-4 py-2 rounded transition-colors">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-300">You haven't saved any theories yet.</p>
            <button onClick={() => navigate('/trending')} className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-gray-100 rounded-lg transition-all">
              Explore Trending Theories
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;