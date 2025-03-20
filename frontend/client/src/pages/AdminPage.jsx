import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { 
  getAllUsers, 
  getTheoriesByUser, 
  getCommentsByUser, 
  getLikesByUser, 
  getSharesByUser, 
  getReportsByUser,
  getActivityLogsByUser
} from '../utils/apiService';

const AdminPage = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [userTheories, setUserTheories] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [userShares, setUserShares] = useState([]);
  const [userReports, setUserReports] = useState([]);
  const [userActivityLogs, setUserActivityLogs] = useState([]);
  
  const [activeTab, setActiveTab] = useState('theories');

  // Check if user is admin, if not redirect to login
  useEffect(() => {
    const checkAdmin = async () => {
      if (!isAdmin) {
        navigate('/auth');
      } else {
        try {
          const fetchedUsers = await getAllUsers();
          setUsers(fetchedUsers);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching users:', err);
          setError('Failed to load users. Please try again.');
          setLoading(false);
        }
      }
    };
    
    checkAdmin();
  }, [isAdmin, navigate]);

  // Fetch user data when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const [theories, comments, likes, shares, reports, logs] = await Promise.all([
            getTheoriesByUser(selectedUser._id),
            getCommentsByUser(selectedUser._id),
            getLikesByUser(selectedUser._id),
            getSharesByUser(selectedUser._id),
            getReportsByUser(selectedUser._id),
            getActivityLogsByUser(selectedUser._id)
          ]);
          
          setUserTheories(theories);
          setUserComments(comments);
          setUserLikes(likes);
          setUserShares(shares);
          setUserReports(reports);
          setUserActivityLogs(logs);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to load user data. Please try again.');
          setLoading(false);
        }
      };
      
      fetchUserData();
    }
  }, [selectedUser]);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    if (userId) {
      const user = users.find(u => u._id === userId);
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text">
            Overseer Control Panel
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {loading && !selectedUser ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 text-red-100 p-4 rounded mb-6">
            {error}
          </div>
        ) : (
          <>
            <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Select User to Monitor</h2>
              <select
                className="w-full bg-gray-700 text-gray-100 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleUserChange}
                value={selectedUser?._id || ''}
              >
                <option value="">-- Select a user --</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            {selectedUser && (
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-2xl font-bold mb-2">{selectedUser.username}</h2>
                  <p className="text-gray-400">Email: {selectedUser.email}</p>
                  <p className="text-gray-400">Joined: {formatDate(selectedUser.createdAt)}</p>
                </div>

                <div className="border-b border-gray-700">
                  <nav className="flex">
                    <button
                      className={`px-4 py-3 font-medium ${activeTab === 'theories' ? 'bg-gray-700 text-purple-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                      onClick={() => setActiveTab('theories')}
                    >
                      Theories ({userTheories.length})
                    </button>
                    <button
                      className={`px-4 py-3 font-medium ${activeTab === 'comments' ? 'bg-gray-700 text-purple-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                      onClick={() => setActiveTab('comments')}
                    >
                      Comments ({userComments.length})
                    </button>
                    <button
                      className={`px-4 py-3 font-medium ${activeTab === 'likes' ? 'bg-gray-700 text-purple-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                      onClick={() => setActiveTab('likes')}
                    >
                      Likes ({userLikes.length})
                    </button>
                    <button
                      className={`px-4 py-3 font-medium ${activeTab === 'shares' ? 'bg-gray-700 text-purple-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                      onClick={() => setActiveTab('shares')}
                    >
                      Shares ({userShares.length})
                    </button>
                    <button
                      className={`px-4 py-3 font-medium ${activeTab === 'reports' ? 'bg-gray-700 text-purple-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                      onClick={() => setActiveTab('reports')}
                    >
                      Reports ({userReports.length})
                    </button>
                    <button
                      className={`px-4 py-3 font-medium ${activeTab === 'activity' ? 'bg-gray-700 text-purple-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                      onClick={() => setActiveTab('activity')}
                    >
                      Activity Log ({userActivityLogs.length})
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                  ) : (
                    <>
                      {activeTab === 'theories' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Theories</h3>
                          {userTheories.length === 0 ? (
                            <p className="text-gray-400">No theories found.</p>
                          ) : (
                            <div className="space-y-4">
                              {userTheories.map(theory => (
                                <div key={theory._id} className="bg-gray-750 p-4 rounded">
                                  <h4 className="text-lg font-medium">{theory.title}</h4>
                                  <p className="text-gray-400 mt-2">{theory.content}</p>
                                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                    <span>Likes: {theory.likes}</span>
                                    <span>Shares: {theory.shares}</span>
                                    <span>Created: {formatDate(theory.createdAt)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'comments' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Comments</h3>
                          {userComments.length === 0 ? (
                            <p className="text-gray-400">No comments found.</p>
                          ) : (
                            <div className="space-y-4">
                              {userComments.map(comment => (
                                <div key={comment._id} className="bg-gray-750 p-4 rounded">
                                  <p>{comment.text}</p>
                                  <div className="mt-2 text-sm text-gray-500">
                                    <span>On theory: {comment.theoryId?.title || 'Unknown theory'}</span>
                                    <span className="ml-4">Posted: {formatDate(comment.createdAt)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'likes' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Likes</h3>
                          {userLikes.length === 0 ? (
                            <p className="text-gray-400">No likes found.</p>
                          ) : (
                            <div className="space-y-4">
                              {userLikes.map(like => (
                                <div key={like._id} className="bg-gray-750 p-4 rounded">
                                  <p>Liked theory: {like.theoryId?.title || 'Unknown theory'}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Liked on: {formatDate(like.createdAt)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'shares' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Shares</h3>
                          {userShares.length === 0 ? (
                            <p className="text-gray-400">No shares found.</p>
                          ) : (
                            <div className="space-y-4">
                              {userShares.map(share => (
                                <div key={share._id} className="bg-gray-750 p-4 rounded">
                                  <p>Shared theory: {share.theoryId?.title || 'Unknown theory'}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Shared to: {share.sharedTo}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Shared on: {formatDate(share.createdAt)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'reports' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Reports</h3>
                          {userReports.length === 0 ? (
                            <p className="text-gray-400">No reports found.</p>
                          ) : (
                            <div className="space-y-4">
                              {userReports.map(report => (
                                <div key={report._id} className="bg-gray-750 p-4 rounded">
                                  <p>Reported theory: {report.theoryId?.title || 'Unknown theory'}</p>
                                  <p className="mt-2">Reason: {report.reason}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Reported on: {formatDate(report.createdAt)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'activity' && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Activity Log</h3>
                          {userActivityLogs.length === 0 ? (
                            <p className="text-gray-400">No activity logs found.</p>
                          ) : (
                            <div className="space-y-4">
                              {userActivityLogs.map(log => (
                                <div key={log._id} className="bg-gray-750 p-4 rounded flex items-center">
                                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-3"></div>
                                  <div>
                                    <p>{log.action}</p>
                                    <p className="text-sm text-gray-500">
                                      {formatDate(log.timestamp)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;