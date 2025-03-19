import React, { useState } from 'react';
// import "./App.css";
import {useAuth} from "../utils/AuthContext";
import {useNavigate} from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Authentication failed. Trust no one, try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <h1 className="title-font text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text mb-2">
            {isLogin ? 'Access The Archives' : 'Join The Illuminated'}
          </h1>
          <p className="text-gray-400 text-sm">
            {isLogin 
              ? 'Enter your credentials to access classified information' 
              : 'Create your secure identity to document the truth'
            }
          </p>
        </div>

        {/* Auth Card */}
        <div className="theory-card bg-gray-800 rounded-xl shadow-lg p-6 mb-8 glow">
          {/* Secret pattern overlay */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            {/* This would be a pattern of symbols/code if we had an SVG */}
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Username field - only for signup */}
            {!isLogin && (
              <div className='usernamediv'>
                <label className="block text-gray-300 text-sm mb-2" htmlFor="username">
                  Codename
                </label>
                <div className="relative" >
                  {/* <span className="absolute left-3 top-3 text-gray-500">
                    @
                  </span> */}
                  <input
                    id="username"
                    type="text"
                    className="w-full bg-gray-700 p-4 pl-8 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="Your unique identifier"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            {/* Email field */}
            <div>
              <label className="block text-gray-300 text-sm mb-2" htmlFor="email">
                Secure Channel
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  className="w-full bg-gray-700 p-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="your-eyes-only@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Password field */}
            <div>
              <label className="block text-gray-300 text-sm mb-2" htmlFor="password">
                Encryption Key
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-700 p-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {isLogin && (
                <div className="flex justify-end mt-2">
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} 
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    {showPassword ? "Classify password" : "Declassify password"}
                  </button>
                </div>
              )}
            </div>
            
            {/* Error message */}
            {error && (
              <div className="bg-gray-750 border border-gray-600 text-gray-300 px-4 py-2 rounded text-sm">
                <span className="text-accent font-semibold">WARNING:</span> {error}
              </div>
            )}
            
            {/* Submit button */}
            <button
              type="submit"
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all ${loading ? 'opacity-70' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Establishing secure connection...</span>
                </span>
              ) : (
                <span>{isLogin ? 'Access Archives' : 'Create Secure Identity'}</span>
              )}
            </button>
          </form>
        </div>
        
        {/* Toggle between login/signup */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have clearance yet?" : "Already one of us?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-400 hover:text-indigo-300 font-medium"
            >
              {isLogin ? 'Request Access' : 'Verify Identity'}
            </button>
          </p>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            End-to-end encrypted | Quantum-resistant
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;