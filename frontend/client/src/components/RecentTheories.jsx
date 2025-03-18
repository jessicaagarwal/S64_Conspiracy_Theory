import React, { useEffect } from 'react';

const RecentTheories = ({ theories }) => {
  useEffect(() => {
    console.log('RecentTheories component received theories:', theories);
  }, [theories]);

  if (!theories || theories.length === 0) {
    console.log('No theories to display');
    return (
      <section className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 title-font">Recent Theories</h3>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <p className="text-gray-400">No theories available. Try generating one!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 title-font">Recent Theories</h3>
      <div className="space-y-3">
        {theories.map(theory => {
          // Handle both client-side and backend data structures
          const id = theory._id || theory.id;
          const keywords = theory.keywords || (theory.tags && theory.tags.map(tag => 
            typeof tag === 'string' ? tag : tag.name || 'Unknown'
          )) || [];
          
          const createdBy = theory.createdBy ? 
            (typeof theory.createdBy === 'string' ? theory.createdBy : theory.createdBy.username || 'Anonymous') : 
            'Anonymous';
          
          const createdAt = theory.createdAt ? new Date(theory.createdAt).toLocaleDateString() : '';
          
          console.log('Rendering theory:', { id, title: theory.title, keywords });
          
          return (
            <div key={id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-colors cursor-pointer theory-card">
              <h4 className="font-medium text-lg text-indigo-300">{theory.title}</h4>
              <p className="line-clamp-2 text-gray-300 mb-2">{theory.content}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <div className="flex gap-1">
                  {keywords.slice(0, 3).map((keyword, index) => (
                    <span key={index} className="bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{theory.likes || 0}</span>
                  </div>
                  {theory.shares !== undefined && (
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span>{theory.shares}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentTheories;