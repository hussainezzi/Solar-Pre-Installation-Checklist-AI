
import React from 'react';

interface VisualWarningsProps {
  warnings: string[];
  isLoading: boolean;
  aiActive: boolean;
}

const VisualWarnings: React.FC<VisualWarningsProps> = ({ warnings, isLoading, aiActive }) => {
  if (isLoading) {
    return <div className="text-center text-gray-600">Generating visual warnings...</div>;
  }

  if (!aiActive) {
    return <p className="text-gray-500 italic">AI not active. No visual warnings generated.</p>;
  }

  if (warnings.length === 0) {
    return <p className="text-gray-500">No specific visual warnings were generated based on the assessment.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {warnings.map((base64Image, index) => (
        <div key={index} className="aspect-square border rounded-lg shadow-sm overflow-hidden">
          <img
            src={`data:image/jpeg;base64,${base64Image}`}
            alt={`Visual warning ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default VisualWarnings;
