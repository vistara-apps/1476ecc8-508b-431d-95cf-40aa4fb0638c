'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Phone, Loader2, Check } from 'lucide-react';
import { EmergencyContact, LocationData } from '@/lib/types';
import { getCurrentLocation, getEmergencyMessage, storage } from '@/lib/utils';

interface EmergencyAlertButtonProps {
  variant?: 'prominent' | 'discreet';
}

export function EmergencyAlertButton({ variant = 'prominent' }: EmergencyAlertButtonProps) {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    // Load emergency contacts from storage
    const contacts = storage.get('emergencyContacts') || [];
    setEmergencyContacts(contacts);
  }, []);

  const handleEmergencyAlert = async () => {
    if (isAlertActive) {
      // Stop alert
      setIsAlertActive(false);
      setAlertSent(false);
      return;
    }

    try {
      setIsLoading(true);
      
      // Get current location
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      // Start alert
      setIsAlertActive(true);
      
      // Send alerts to emergency contacts
      await sendEmergencyAlerts(currentLocation);
      
      setAlertSent(true);
    } catch (error) {
      console.error('Emergency alert error:', error);
      alert('Failed to send emergency alert. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmergencyAlerts = async (location: LocationData) => {
    const userName = storage.get('userName') || 'RightsGuard User';
    const incidentId = Date.now().toString();
    const message = getEmergencyMessage(userName, location, incidentId);

    // In a real app, this would send SMS via Twilio or similar service
    // For demo purposes, we'll simulate the alert
    console.log('Emergency alert sent:', {
      contacts: emergencyContacts,
      message,
      location,
    });

    // Store the alert in local storage
    const alerts = storage.get('emergencyAlerts') || [];
    alerts.push({
      id: incidentId,
      timestamp: new Date().toISOString(),
      location,
      contacts: emergencyContacts,
      message,
    });
    storage.set('emergencyAlerts', alerts);
  };

  const buttonClass = variant === 'prominent' 
    ? 'w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3'
    : 'glass-button bg-red-500 bg-opacity-20 border-red-400 text-red-300 hover:bg-opacity-30';

  if (variant === 'discreet') {
    return (
      <button
        onClick={handleEmergencyAlert}
        disabled={isLoading}
        className={`${buttonClass} ${isAlertActive ? 'emergency-pulse' : ''}`}
        aria-label="Emergency Alert"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isAlertActive ? (
          <div className="flex items-center space-x-2">
            <div className="recording-indicator" />
            <span className="text-sm">Alert Active</span>
          </div>
        ) : (
          <AlertTriangle className="w-5 h-5" />
        )}
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleEmergencyAlert}
        disabled={isLoading}
        className={`${buttonClass} ${isAlertActive ? 'emergency-pulse' : ''}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Sending Alert...</span>
          </>
        ) : isAlertActive ? (
          <>
            <div className="recording-indicator" />
            <span>Emergency Alert Active - Tap to Stop</span>
          </>
        ) : (
          <>
            <AlertTriangle className="w-6 h-6" />
            <span>Send Emergency Alert</span>
          </>
        )}
      </button>

      {alertSent && (
        <div className="glass-card p-4 bg-green-500 bg-opacity-20 border-green-400">
          <div className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-green-300 font-semibold">Alert Sent Successfully</p>
              <p className="text-sm text-gray-300">
                {emergencyContacts.length} contact(s) notified
              </p>
            </div>
          </div>
        </div>
      )}

      {emergencyContacts.length === 0 && (
        <div className="glass-card p-4 bg-yellow-500 bg-opacity-20 border-yellow-400">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-yellow-300 font-semibold">No Emergency Contacts</p>
              <p className="text-sm text-gray-300">
                Add contacts in settings to enable alerts
              </p>
            </div>
          </div>
        </div>
      )}

      {location && (
        <div className="text-xs text-gray-500">
          <p>Current location: {location.address || `${location.latitude}, ${location.longitude}`}</p>
        </div>
      )}
    </div>
  );
}
