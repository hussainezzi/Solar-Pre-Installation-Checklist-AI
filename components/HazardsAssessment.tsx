
import React from 'react';

interface HazardsAssessmentProps {
  hazards: string;
  setHazards: (value: string) => void;
  isLoading: boolean;
  aiActive: boolean;
}

const HazardsAssessment: React.FC<HazardsAssessmentProps> = ({ hazards, setHazards, isLoading, aiActive }) => {
  if (isLoading) {
    return <div className="text-center text-gray-600">Generating hazards assessment...</div>;
  }
  
  return (
    <div className="border-2 border-[#dc3545] rounded-lg p-4 bg-red-50">
      <h3 className="text-lg font-bold text-[#dc3545] mb-2">Potential Hazards</h3>
      {aiActive ? (
        <div className="whitespace-pre-wrap text-gray-800">{hazards}</div>
      ) : (
        <textarea
          value={hazards}
          onChange={(e) => setHazards(e.target.value)}
          rows={5}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#dc3545] focus:border-[#dc3545]"
          placeholder="AI not active. Please manually list potential hazards, e.g., 'Steep roof pitch', 'Old wiring', 'Potential for falling debris'."
        />
      )}
    </div>
  );
};

export default HazardsAssessment;
