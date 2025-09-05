'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppHeader } from '@/components/AppHeader';
import { StateGuideCard } from '@/components/StateGuideCard';
import { CallToActionButtons } from '@/components/CallToActionButtons';
import { EmergencyAlertButton } from '@/components/EmergencyAlertButton';
import { ScriptDisplay } from '@/components/ScriptDisplay';
import { IncidentRecorder } from '@/components/IncidentRecorder';
import { MapPin, Star, Users, Shield } from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFrameReady();
    setIsLoaded(true);
  }, [setFrameReady]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text mb-2">RightsGuard</h1>
          <p className="text-gray-400">Loading your rights protection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <AppHeader />

        {activeSection === 'home' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="relative">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text text-shadow">
                  RightsGuard
                </h1>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                The only mobile app you need to know your legal rights during police interactions and document incidents safely.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card p-4 text-center">
                <MapPin className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">50</p>
                <p className="text-xs text-gray-400">States Covered</p>
              </div>
              <div className="glass-card p-4 text-center">
                <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">10K+</p>
                <p className="text-xs text-gray-400">Users Protected</p>
              </div>
              <div className="glass-card p-4 text-center">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">4.9</p>
                <p className="text-xs text-gray-400">App Rating</p>
              </div>
            </div>

            {/* Main Action Buttons */}
            <CallToActionButtons
              onRightsGuide={() => handleSectionChange('rights')}
              onScripts={() => handleSectionChange('scripts')}
              onRecording={() => handleSectionChange('recording')}
              onEmergency={() => handleSectionChange('emergency')}
            />

            {/* State Rights Guide Preview */}
            <StateGuideCard variant="compact" />

            {/* Emergency Alert */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Emergency Features</h2>
              <EmergencyAlertButton variant="prominent" />
            </div>

            {/* Subscription Prompt */}
            <div className="glass-card p-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 border-purple-400">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-white">Upgrade to Premium</h3>
                <p className="text-sm text-gray-300">
                  Get Spanish translations, cloud backup, and priority support for just $4.99/month
                </p>
                <button className="bg-white text-purple-900 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'rights' && (
          <div className="space-y-6">
            <button
              onClick={() => handleSectionChange('home')}
              className="glass-button text-sm"
            >
              ← Back to Home
            </button>
            <StateGuideCard variant="expanded" />
          </div>
        )}

        {activeSection === 'scripts' && (
          <div className="space-y-6">
            <button
              onClick={() => handleSectionChange('home')}
              className="glass-button text-sm"
            >
              ← Back to Home
            </button>
            <ScriptDisplay />
          </div>
        )}

        {activeSection === 'recording' && (
          <div className="space-y-6">
            <button
              onClick={() => handleSectionChange('home')}
              className="glass-button text-sm"
            >
              ← Back to Home
            </button>
            <IncidentRecorder />
          </div>
        )}

        {activeSection === 'emergency' && (
          <div className="space-y-6">
            <button
              onClick={() => handleSectionChange('home')}
              className="glass-button text-sm"
            >
              ← Back to Home
            </button>
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Emergency Alert System</h2>
              <EmergencyAlertButton variant="prominent" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
