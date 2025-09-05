// User data model
export interface User {
  userId: string;
  phoneNumber?: string;
  emergencyContacts: EmergencyContact[];
  languagePreference: 'en' | 'es';
  subscriptionStatus: 'free' | 'premium';
  lastLocationUpdate?: string;
}

export interface EmergencyContact {
  name: string;
  phoneNumber: string;
}

// Incident data model
export interface Incident {
  incidentId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  recordingUrl?: string;
  notes: string;
  status: 'active' | 'completed';
}

// State rights guide data model
export interface StateRightsGuide {
  stateCode: string;
  stateName: string;
  guideContent: {
    whatToDo: string[];
    whatNotToSay: string[];
    keyRights: string[];
    emergencyNumbers: string[];
  };
  lastUpdated: string;
}

// De-escalation scripts
export interface DeEscalationScript {
  id: string;
  scenario: string;
  englishScript: string;
  spanishScript: string;
  category: 'traffic_stop' | 'street_encounter' | 'home_visit' | 'general';
}

// Location data
export interface LocationData {
  latitude: number;
  longitude: number;
  state?: string;
  city?: string;
  address?: string;
}

// Rights card data
export interface RightsCard {
  id: string;
  userId: string;
  stateCode: string;
  content: {
    title: string;
    keyRights: string[];
    emergencyContacts: EmergencyContact[];
    generatedAt: string;
  };
  imageUrl?: string;
  shareableLink?: string;
}

// Recording data
export interface RecordingData {
  id: string;
  incidentId: string;
  type: 'audio' | 'video';
  url: string;
  duration: number;
  createdAt: string;
}

// Subscription data
export interface Subscription {
  userId: string;
  plan: 'free' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  expiresAt?: string;
  features: string[];
}
