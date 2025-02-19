import React, { useState } from 'react';
import TheoryGenerator from '../components/TheoryGenerator';
import RecentTheories from '../components/RecentTheories';

const HomePage = () => {
  const [recentTheories, setRecentTheories] = useState([]);

  const handleNewTheory = (newTheory) => {
    setRecentTheories(prev => [newTheory, ...prev].slice(0, 5));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4 title-font text-shadow">Uncover the "Truth" Hidden in Plain Sight</h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Generate absurd conspiracy theories with our AI-powered generator. Connect dots that don't exist!
        </p>
      </section>

      {/* Generator Section */}
      <TheoryGenerator onNewTheory={handleNewTheory} />

      {/* Recent Theories */}
      <RecentTheories theories={recentTheories} />
    </main>
  );
};

export default HomePage;