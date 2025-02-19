import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="py-12 flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-700 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400">Connecting the dots...</p>
    </div>
  );
};

export default LoadingSpinner;