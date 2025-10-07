
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-8 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0056b3]">
          Solar Pre-Installation Checklist AI
        </h1>
        <p className="text-gray-600">Your AI-powered safety and planning assistant.</p>
      </div>
    </header>
  );
};

export default Header;
