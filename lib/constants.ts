export const APP_CONFIG = {
  name: 'RightsGuard',
  tagline: 'Know Your Rights, Stay Safe',
  version: '1.0.0',
  supportEmail: 'support@rightsguard.app',
};

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Basic rights guides',
      'English de-escalation scripts',
      'Basic incident recording',
    ],
  },
  premium: {
    name: 'Premium',
    price: 4.99,
    features: [
      'All free features',
      'Spanish translations',
      'Cloud backup of recordings',
      'Advanced emergency alerts',
      'Priority support',
    ],
  },
};

export const EMERGENCY_ALERT_COST = 0.99;

export const DEFAULT_EMERGENCY_CONTACTS = [
  { name: 'Emergency Services', phoneNumber: '911' },
  { name: 'ACLU Hotline', phoneNumber: '1-877-6-PROFILE' },
];

export const STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

export const DE_ESCALATION_SCENARIOS = [
  {
    id: 'traffic_stop',
    name: 'Traffic Stop',
    description: 'When pulled over by police while driving',
  },
  {
    id: 'street_encounter',
    name: 'Street Encounter',
    description: 'When approached by police on the street',
  },
  {
    id: 'home_visit',
    name: 'Home Visit',
    description: 'When police come to your home',
  },
  {
    id: 'general',
    name: 'General Interaction',
    description: 'General police interaction guidelines',
  },
];
