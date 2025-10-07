
import React, { useState } from 'react';
import type { InstallationDetails } from '../types';

interface InstallationFormProps {
  onSubmit: (details: InstallationDetails) => void;
  aiActive: boolean;
  isLoading: boolean;
}

const roofTypes = ["Asphalt Shingle", "Metal", "Tile", "Flat/EPDM", "Composite"];

const InstallationForm: React.FC<InstallationFormProps> = ({ onSubmit, aiActive, isLoading }) => {
  const [details, setDetails] = useState<InstallationDetails>({
    roofType: roofTypes[0],
    propertyAge: '',
    systemSize: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="roofType" className="block text-sm font-medium text-gray-700">Roof Type</label>
        <select
          id="roofType"
          name="roofType"
          value={details.roofType}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#0056b3] focus:border-[#0056b3] sm:text-sm rounded-md shadow-sm"
        >
          {roofTypes.map(type => <option key={type}>{type}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="propertyAge" className="block text-sm font-medium text-gray-700">Property Age (years)</label>
        <input
          type="number"
          id="propertyAge"
          name="propertyAge"
          value={details.propertyAge}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0056b3] focus:border-[#0056b3] sm:text-sm"
          placeholder="e.g., 15"
        />
      </div>
      <div>
        <label htmlFor="systemSize" className="block text-sm font-medium text-gray-700">System Size (kW)</label>
        <input
          type="number"
          id="systemSize"
          name="systemSize"
          value={details.systemSize}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0056b3] focus:border-[#0056b3] sm:text-sm"
          placeholder="e.g., 7.5"
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#0056b3] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            aiActive ? 'Analyze & Generate Initial Briefing' : 'Start Manual Briefing'
          )}
        </button>
      </div>
    </form>
  );
};

export default InstallationForm;
