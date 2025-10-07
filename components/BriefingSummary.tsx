
import React from 'react';

interface BriefingSummaryProps {
  summary: string;
  isLoading: boolean;
}

const BriefingSummary: React.FC<BriefingSummaryProps> = ({ summary, isLoading }) => {
  if (isLoading) {
    return <div className="text-center text-gray-600">Generating briefing summary...</div>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-inner">
      <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{summary}</pre>
    </div>
  );
};

export default BriefingSummary;
