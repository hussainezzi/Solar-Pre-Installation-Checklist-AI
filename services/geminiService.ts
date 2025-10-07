
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { InstallationDetails, ChecklistItem } from '../types';

const API_KEY = "AIzaSyAf6a00_m7aO0iWarM_lG7RYy-pKtqlty4";

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const isAiAvailable = (): boolean => !!ai;

export const generateHazards = async (details: InstallationDetails): Promise<string> => {
  if (!ai) return "AI not active. Please enter potential hazards manually.";

  const prompt = `
    Generate a site-specific hazards assessment for a solar panel installation with the following details:
    - Roof Type: ${details.roofType}
    - Property Age: ${details.propertyAge} years
    - System Size: ${details.systemSize} kW

    Focus on potential risks like structural integrity, electrical hazards, fall risks, and material handling challenges.
    The output should be a concise list of bullet points.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating hazards assessment:", error);
    return "Error generating hazards. Please check the console and try again, or enter hazards manually.";
  }
};


export const generateVisualWarnings = async (hazardsText: string): Promise<string[]> => {
    if (!ai) return [];

    const hazardKeywordsPrompt = `
        Based on the following hazard assessment, extract up to 3 main, distinct keywords for visual warnings.
        Examples: 'Slippery Roof', 'Electrical Hazard', 'Unstable Structure', 'Falling Debris'.
        Assessment: "${hazardsText}"
        Respond with only the keywords, separated by commas.
    `;
    
    let keywords = [];
    try {
        const keywordResponse: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: hazardKeywordsPrompt,
        });
        keywords = keywordResponse.text.split(',').map(k => k.trim()).filter(Boolean);
    } catch (error) {
        console.error("Error extracting keywords for images:", error);
        return [];
    }

    if (keywords.length === 0) return [];

    const imagePromises = keywords.map(async (keyword) => {
        const imagePrompt = `
            Generate a simple, clear, industrial-style safety warning sign for a construction site.
            The sign should visually represent "${keyword}".
            Use a high-contrast style with bold lines and minimal text. The primary colors should be red, black, and white.
        `;
        try {
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: imagePrompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '1:1',
                },
            });
            return response.generatedImages[0].image.imageBytes;
        } catch (error) {
            console.error(`Error generating image for "${keyword}":`, error);
            return null;
        }
    });

    const base64Images = await Promise.all(imagePromises);
    return base64Images.filter((img): img is string => img !== null);
};

export const generateChecklist = async (hazardsText: string): Promise<ChecklistItem[]> => {
  if (!ai) return [];

  const prompt = `
    Based on the following solar installation hazard assessment, create a step-by-step pre-installation safety checklist.
    Each item should be a clear, actionable task for the installation team.
    Assessment: "${hazardsText}"
    
    Return a JSON array of objects, where each object has a 'text' property. Example: [{"text": "Inspect roof for structural damage"}, {"text": "Confirm main power breaker is off"}]
  `;

  try {
     const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: 'ARRAY',
                items: {
                    type: 'OBJECT',
                    properties: {
                        text: {
                            type: 'STRING'
                        }
                    }
                }
            }
        }
     });

    const jsonText = response.text.trim();
    const items: { text: string }[] = JSON.parse(jsonText);
    return items.map((item, index) => ({
      id: index + 1,
      text: item.text,
      completed: false,
    }));
  } catch (error) {
    console.error("Error generating checklist:", error);
    return [];
  }
};

export const generateBriefing = async (
  details: InstallationDetails,
  hazards: string,
  checklist: ChecklistItem[]
): Promise<string> => {
  if (!ai) return "AI not active. Briefing summary cannot be generated.";

  const completedTasks = checklist.filter(item => item.completed).map(item => item.text).join('\n - ');
  const pendingTasks = checklist.filter(item => !item.completed).map(item => item.text).join('\n - ');

  const prompt = `
    Generate a concise team safety briefing document for a solar panel installation.
    The document should be structured with clear headings.
    
    **Installation Details:**
    - Roof Type: ${details.roofType}
    - Property Age: ${details.propertyAge} years
    - System Size: ${details.systemSize} kW
    
    **Key Hazard Assessment:**
    ${hazards}
    
    **Pre-Installation Checklist Status:**
    - Completed Tasks:
     - ${completedTasks || 'None'}
    - Pending Tasks:
     - ${pendingTasks || 'None'}
    
    Summarize the key safety points, prioritize the pending tasks, and conclude with a safety affirmation.
  `;

  try {
     const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating briefing summary:", error);
    return "Error generating briefing summary. Please check the console.";
  }
};
