import React from 'react';

const ApiKeyWarning: React.FC = () => {
  return (
    <div className="bg-[#dc3545] text-white text-center p-2 font-semibold">
      <p>Please enter your Gemini API key below to enable AI features. The app remains functional for manual use.</p>
    </div>
  );
};

export default ApiKeyWarning;
