import React from 'react';

const RecentTheories = ({ theories }) => {
  if (!theories || theories.length === 0) {
    return null;
  }

  return (
    <section className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 title-font">Recent Theories</h3>
      <div className="space-y-3">
        {theories.map(theory => (
          <div key={theory.id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-colors cursor-pointer theory-card">
            <h4 className="font-medium text-lg text-indigo-300">{theory.title}</h4>
            <p className="line-clamp-2 text-gray-300 mb-2">{theory.content}</p>
            <div className="flex justify-between text-sm text-gray-400">
              <div className="flex gap-1">
                {theory.keywords.slice(0, 3).map((keyword, index) => (
                  <span key={index} className="bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {theory.likes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentTheories;