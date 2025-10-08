import React from 'react';

const WorkflowStep: React.FC<{ number: number; title: string; isLast?: boolean }> = ({ number, title, isLast }) => (
  <div className="flex items-center flex-1 min-w-0">
    <div className="flex flex-col items-center">
      <div className="w-8 h-8 bg-[#0056b3] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">{number}</div>
      <p className="text-xs mt-1 text-center text-gray-600">{title}</p>
    </div>
    {!isLast && <div className="flex-1 border-t-2 border-dashed border-gray-400 mx-2 md:mx-4"></div>}
  </div>
);

const Workflow: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">Application Workflow</h2>
        <div className="flex justify-between items-start">
            <WorkflowStep number={1} title="Details" />
            <WorkflowStep number={2} title="Hazards" />
            <WorkflowStep number={3} title="Warnings" />
            <WorkflowStep number={4} title="Checklist" />
            <WorkflowStep number={5} title="Briefing" isLast />
        </div>
    </div>
  );
};

export default Workflow;
