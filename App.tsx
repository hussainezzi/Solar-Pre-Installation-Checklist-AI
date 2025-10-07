
import React, { useState, useCallback } from 'react';
import type { InstallationDetails, ChecklistItem, LoadingStates } from './types';
import { isAiAvailable, generateHazards, generateVisualWarnings, generateChecklist, generateBriefing } from './services/geminiService';
import Header from './components/Header';
import InstallationForm from './components/InstallationForm';
import HazardsAssessment from './components/HazardsAssessment';
import VisualWarnings from './components/VisualWarnings';
import PreInstallationChecklist from './components/PreInstallationChecklist';
import BriefingSummary from './components/BriefingSummary';
import ApiKeyWarning from './components/ApiKeyWarning';
import StepCard from './components/StepCard';

const App: React.FC = () => {
  const [aiActive] = useState<boolean>(isAiAvailable());
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [installationDetails, setInstallationDetails] = useState<InstallationDetails | null>(null);
  const [hazards, setHazards] = useState<string>('');
  const [visualWarnings, setVisualWarnings] = useState<string[]>([]);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [briefingSummary, setBriefingSummary] = useState<string>('');

  const [loading, setLoading] = useState<LoadingStates>({
    hazards: false,
    visuals: false,
    checklist: false,
    briefing: false,
  });

  const handleFormSubmit = useCallback(async (details: InstallationDetails) => {
    setInstallationDetails(details);
    setCurrentStep(2);
    setHazards('');
    setVisualWarnings([]);
    setChecklistItems([]);
    setBriefingSummary('');

    if (aiActive) {
      setLoading(prev => ({ ...prev, hazards: true }));
      const hazardText = await generateHazards(details);
      setHazards(hazardText);
      setLoading(prev => ({ ...prev, hazards: false }));
      
      setCurrentStep(3);

      setLoading(prev => ({ ...prev, visuals: true }));
      const warnings = await generateVisualWarnings(hazardText);
      setVisualWarnings(warnings);
      setLoading(prev => ({ ...prev, visuals: false }));
      
      setCurrentStep(4);
      
      setLoading(prev => ({ ...prev, checklist: true }));
      const checklist = await generateChecklist(hazardText);
      setChecklistItems(checklist);
      setLoading(prev => ({ ...prev, checklist: false }));
    }
  }, [aiActive]);

  const handleGenerateBriefing = useCallback(async () => {
    if (!installationDetails) return;
    setCurrentStep(5);
    if (aiActive) {
      setLoading(prev => ({ ...prev, briefing: true }));
      const summary = await generateBriefing(installationDetails, hazards, checklistItems);
      setBriefingSummary(summary);
      setLoading(prev => ({ ...prev, briefing: false }));
    } else {
        const briefingTemplate = `
## Team Briefing Summary ##

**Installation Details:**
- Roof Type: ${installationDetails.roofType}
- Property Age: ${installationDetails.propertyAge} years
- System Size: ${installationDetails.systemSize} kW

**Manual Hazard Assessment:**
${hazards || 'No hazards entered.'}

**Checklist Items:**
${checklistItems.length > 0 ? checklistItems.map(item => `- [${item.completed ? 'x' : ' '}] ${item.text}`).join('\n') : 'No checklist items added.'}

**Proceed with caution and follow all safety protocols.**
        `;
        setBriefingSummary(briefingTemplate.trim());
    }
  }, [aiActive, installationDetails, hazards, checklistItems]);

  return (
    <div className="min-h-screen text-gray-800">
      <Header />
      {!aiActive && <ApiKeyWarning />}
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 gap-8">
          <StepCard title="Installation Specifics" step={1} active={currentStep >= 1}>
            <InstallationForm onSubmit={handleFormSubmit} aiActive={aiActive} isLoading={loading.hazards}/>
          </StepCard>

          {currentStep >= 2 && (
            <StepCard title="Site-Specific Hazards Assessment" step={2} active={currentStep >= 2}>
              <HazardsAssessment 
                hazards={hazards} 
                setHazards={setHazards} 
                isLoading={loading.hazards} 
                aiActive={aiActive}
              />
            </StepCard>
          )}

          {currentStep >= 3 && (
            <StepCard title="Visual Safety Warnings" step={3} active={currentStep >= 3}>
              <VisualWarnings warnings={visualWarnings} isLoading={loading.visuals} aiActive={aiActive} />
            </StepCard>
          )}

          {currentStep >= 4 && (
            <StepCard title="Step-by-Step Pre-Installation Checklist" step={4} active={currentStep >= 4}>
              <PreInstallationChecklist 
                items={checklistItems} 
                setItems={setChecklistItems} 
                isLoading={loading.checklist} 
                aiActive={aiActive}
              />
            </StepCard>
          )}

          {currentStep >= 4 && (
             <div className="flex justify-center">
               <button
                  onClick={handleGenerateBriefing}
                  disabled={loading.briefing}
                  className="w-full md:w-1/2 bg-[#dc3545] text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center text-lg shadow-lg"
                >
                  {loading.briefing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : "Generate Briefing Summary"}
                </button>
             </div>
          )}

          {currentStep >= 5 && (
            <StepCard title="Team Briefing Document" step={5} active={currentStep >= 5}>
              <BriefingSummary summary={briefingSummary} isLoading={loading.briefing} />
            </StepCard>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
