import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-3xl font-bold title-font bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Conspiracy Theory Generator
            </h1>
          </Link>
          <nav>
            <ul className="flex gap-4 list-none">
              <ul>
                <Link to="/" style={{ textDecoration: 'none'}} className="text-gray-400 hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </ul>
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;