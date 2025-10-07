
export interface InstallationDetails {
  roofType: string;
  propertyAge: string;
  systemSize: string;
}

export interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

export type LoadingStates = {
  hazards: boolean;
  visuals: boolean;
  checklist: boolean;
  briefing: boolean;
};
