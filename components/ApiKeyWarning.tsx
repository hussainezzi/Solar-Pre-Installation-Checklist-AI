
import React from 'react';

const ApiKeyWarning: React.FC = () => {
  return (
    <div className="bg-[#dc3545] text-white text-center p-2 font-semibold">
      <p>Gemini API Key not found. AI features are disabled. The app remains functional for manual use.</p>
    </div>
  );
};

export default ApiKeyWarning;
