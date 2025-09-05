'use client';

import { useState } from 'react';
import { Shield, MessageSquare, Video, AlertTriangle } from 'lucide-react';

interface CallToActionButtonsProps {
  variant?: 'primary' | 'secondary' | 'danger';
  onRightsGuide?: () => void;
  onScripts?: () => void;
  onRecording?: () => void;
  onEmergency?: () => void;
}

export function CallToActionButtons({ 
  variant = 'primary',
  onRightsGuide,
  onScripts,
  onRecording,
  onEmergency
}: CallToActionButtonsProps) {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (action: string, callback?: () => void) => {
    setActiveButton(action);
    callback?.();
    setTimeout(() => setActiveButton(null), 200);
  };

  const buttonClass = (action: string, colorClass: string) => `
    glass-card p-4 text-center hover:bg-opacity-20 transition-all duration-200 cursor-pointer
    ${activeButton === action ? 'scale-95 bg-opacity-30' : 'hover:scale-105'}
    ${colorClass}
  `;

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => handleButtonClick('rights', onRightsGuide)}
        className={buttonClass('rights', 'hover:border-green-400')}
      >
        <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <h3 className="font-semibold text-white mb-1">Rights Guide</h3>
        <p className="text-xs text-gray-400">Know your legal rights</p>
      </button>

      <button
        onClick={() => handleButtonClick('scripts', onScripts)}
        className={buttonClass('scripts', 'hover:border-blue-400')}
      >
        <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2" />
        <h3 className="font-semibold text-white mb-1">De-escalation</h3>
        <p className="text-xs text-gray-400">Safe conversation scripts</p>
      </button>

      <button
        onClick={() => handleButtonClick('recording', onRecording)}
        className={buttonClass('recording', 'hover:border-purple-400')}
      >
        <Video className="w-8 h-8 text-purple-400 mx-auto mb-2" />
        <h3 className="font-semibold text-white mb-1">Record Incident</h3>
        <p className="text-xs text-gray-400">Document interactions</p>
      </button>

      <button
        onClick={() => handleButtonClick('emergency', onEmergency)}
        className={buttonClass('emergency', 'hover:border-red-400 emergency-pulse')}
      >
        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <h3 className="font-semibold text-white mb-1">Emergency Alert</h3>
        <p className="text-xs text-gray-400">Notify contacts</p>
      </button>
    </div>
  );
}
