import React from 'react';

interface ApiKeyManagerProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ apiKey, setApiKey }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Configure Your Gemini API Key</h2>
      <p className="text-gray-600 mb-4">
        To unlock the AI-powered features, please provide your Google Gemini API key. If a key is available in your environment, it has been pre-filled.
      </p>
      <div className="relative">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-6 0H7a2 2 0 01-2-2V9a2 2 0 012-2h2m-4 6h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
        </svg>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Gemini API key"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0056b3] focus:border-[#0056b3]"
          aria-label="Gemini API Key Input"
        />
      </div>
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-[#0056b3] hover:underline font-medium">
          How to get a Gemini API key?
        </summary>
        <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-700">
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to the <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Google AI Studio</a>.</li>
            <li>Click on the <strong>"Get API key"</strong> button.</li>
            <li><strong>"Create API key in new project"</strong> or use an existing one.</li>
            <li>Copy the generated API key and paste it into the input field above.</li>
          </ol>
        </div>
      </details>
    </div>
  );
};

export default ApiKeyManager;
