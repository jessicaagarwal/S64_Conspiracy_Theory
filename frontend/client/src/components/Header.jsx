import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center gap-4">
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 min-w-0">
            <h1 className="text-xl md:text-3xl font-bold title-font bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent whitespace-nowrap overflow-hidden">
              Conspiracy Theory Generator
            </h1>
          </Link>

          {/* Navigation Section */}
          <nav className="flex-shrink-0 min-w-0">
            <ul className="flex items-center gap-4 md:gap-6 list-none">
              <li className="whitespace-nowrap">
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-indigo-400 transition-colors px-2 py-1 md:px-3 md:py-2 text-sm md:text-base"
                >
                  Home
                </Link>
              </li>
              
              {currentUser ? (
                <>
                  <li className="whitespace-nowrap">
                    <Link 
                      to="/dashboard" 
                      className="text-gray-400 hover:text-indigo-400 transition-colors px-2 py-1 md:px-3 md:py-2 text-sm md:text-base"
                    >
                      Control Panel
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center gap-2 md:gap-3 ml-2">
                      <span className="hidden md:inline text-xs px-2 py-1 bg-gray-800 rounded-full text-indigo-400 border border-indigo-600">
                        @{currentUser.username}
                      </span>
                      <button 
                        className="text-gray-400 hover:text-indigo-400 transition-colors px-2 py-1 md:px-3 md:py-2 text-sm md:text-base"
                        onClick={() => logout()}
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                </>
              ) : (
                <li className="whitespace-nowrap">
                  <Link 
                    to="/auth" 
                    className="text-gray-400 hover:text-indigo-400 transition-colors px-2 py-1 md:px-3 md:py-2 text-sm md:text-base"
                  >
                    Login / Register
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;