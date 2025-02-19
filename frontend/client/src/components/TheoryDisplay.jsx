import React from 'react';

const TheoryDisplay = ({ theory }) => {
  return (
    <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 theory-card">
      <h4 className="text-xl font-bold mb-2 text-indigo-300 title-font">{theory.title}</h4>
      <p className="mb-4">{theory.content}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {theory.keywords.map((keyword, index) => (
            <span key={index} className="bg-gray-800 px-2 py-1 rounded text-xs">
              {keyword}
            </span>
          ))}
        </div>
        <div className="flex items-center">
          <button className="flex items-center gap-1 text-black-400 hover:text-indigo-400 btn-like">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{theory.likes}</span>
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2 justify-end">
        <button className="text-sm px-4 py-1 rounded btn-save">
          Save
        </button>
        <button className="text-sm px-4 py-1 rounded btn-share">
          Share
        </button>
      </div>
    </div>
  );
};

export default TheoryDisplay;