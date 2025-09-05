'use client';

import { useState, useEffect } from 'react';
import { MapPin, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { StateRightsGuide, LocationData } from '@/lib/types';
import { getCurrentLocation, getStateCode } from '@/lib/utils';
import { generateStateRightsGuide } from '@/lib/openai';
import { STATES } from '@/lib/constants';

interface StateGuideCardProps {
  variant?: 'compact' | 'expanded';
}

export function StateGuideCard({ variant = 'compact' }: StateGuideCardProps) {
  const [guide, setGuide] = useState<StateRightsGuide | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRightsGuide();
  }, []);

  const loadRightsGuide = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get user location
      const userLocation = await getCurrentLocation();
      setLocation(userLocation);

      // Get state code
      const stateCode = userLocation.state ? getStateCode(userLocation.state) : 'CA';
      const stateName = STATES.find(s => s.code === stateCode)?.name || 'California';

      // Generate rights guide
      const guideContent = await generateStateRightsGuide(stateCode, stateName);

      const rightsGuide: StateRightsGuide = {
        stateCode,
        stateName,
        guideContent,
        lastUpdated: new Date().toISOString(),
      };

      setGuide(rightsGuide);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rights guide');
      console.error('Error loading rights guide:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-center space-x-3">
          <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
          <span className="text-gray-300">Loading your rights guide...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-6">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={loadRightsGuide}
            className="glass-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!guide) return null;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-purple-400" />
          <div>
            <h2 className="text-lg font-semibold text-white">
              {guide.stateName} Rights Guide
            </h2>
            {location && (
              <p className="text-sm text-gray-400">
                {location.city && `${location.city}, `}{guide.stateCode}
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="glass-button p-2"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* What To Do */}
          <div>
            <h3 className="text-md font-semibold text-green-400 mb-3">✓ What TO DO</h3>
            <ul className="space-y-2">
              {guide.guideContent.whatToDo.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Not To Say */}
          <div>
            <h3 className="text-md font-semibold text-red-400 mb-3">✗ What NOT TO SAY</h3>
            <ul className="space-y-2">
              {guide.guideContent.whatNotToSay.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Rights */}
          <div>
            <h3 className="text-md font-semibold text-blue-400 mb-3">⚖️ Your Key Rights</h3>
            <ul className="space-y-2">
              {guide.guideContent.keyRights.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Numbers */}
          <div>
            <h3 className="text-md font-semibold text-yellow-400 mb-3">📞 Emergency Numbers</h3>
            <ul className="space-y-2">
              {guide.guideContent.emergencyNumbers.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-white border-opacity-20">
            <p className="text-xs text-gray-500">
              Last updated: {new Date(guide.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
