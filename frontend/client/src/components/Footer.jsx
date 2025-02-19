import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 mt-20">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-500">
          © {new Date().getFullYear()} Conspiracy Theory Generator - For entertainment purposes only
        </p>
      </div>
    </footer>
  );
};

export default Footer;