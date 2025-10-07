
import React from 'react';

interface StepCardProps {
  step: number;
  title: string;
  active: boolean;
  children: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, active, children }) => {
  if (!active) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#0056b3]">
      <div className="flex items-center mb-4">
        <div className="bg-[#0056b3] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg mr-4">{step}</div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="pl-12">
        {children}
      </div>
    </div>
  );
};

export default StepCard;
