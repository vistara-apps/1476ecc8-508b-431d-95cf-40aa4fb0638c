'use client';

import { useState, useEffect } from 'react';
import { Copy, Volume2, Loader2, Languages } from 'lucide-react';
import { DeEscalationScript } from '@/lib/types';
import { generateDeEscalationScript } from '@/lib/openai';
import { DE_ESCALATION_SCENARIOS } from '@/lib/constants';

interface ScriptDisplayProps {
  variant?: 'english' | 'spanish';
}

export function ScriptDisplay({ variant = 'english' }: ScriptDisplayProps) {
  const [selectedScenario, setSelectedScenario] = useState('traffic_stop');
  const [language, setLanguage] = useState<'en' | 'es'>(variant === 'spanish' ? 'es' : 'en');
  const [script, setScript] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  useEffect(() => {
    loadScript();
  }, [selectedScenario, language]);

  const loadScript = async () => {
    setIsLoading(true);
    try {
      const generatedScript = await generateDeEscalationScript(selectedScenario, language);
      setScript(generatedScript);
    } catch (error) {
      console.error('Error loading script:', error);
      setScript('Error loading script. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopiedScript(script);
      setTimeout(() => setCopiedScript(null), 2000);
    } catch (error) {
      console.error('Failed to copy script:', error);
    }
  };

  const speakScript = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(script);
      utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const currentScenario = DE_ESCALATION_SCENARIOS.find(s => s.id === selectedScenario);

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">De-escalation Scripts</h2>
        <button
          onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          className="glass-button flex items-center space-x-2"
        >
          <Languages className="w-4 h-4" />
          <span>{language === 'en' ? 'EN' : 'ES'}</span>
        </button>
      </div>

      {/* Scenario Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Scenario
        </label>
        <select
          value={selectedScenario}
          onChange={(e) => setSelectedScenario(e.target.value)}
          className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {DE_ESCALATION_SCENARIOS.map((scenario) => (
            <option key={scenario.id} value={scenario.id} className="bg-gray-800">
              {scenario.name}
            </option>
          ))}
        </select>
        {currentScenario && (
          <p className="text-sm text-gray-400 mt-1">{currentScenario.description}</p>
        )}
      </div>

      {/* Script Display */}
      <div className="space-y-4">
        <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-4">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3 py-8">
              <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
              <span className="text-gray-300">Generating script...</span>
            </div>
          ) : (
            <div>
              <p className="text-white leading-relaxed">{script}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={copyScript}
            disabled={isLoading}
            className="glass-button flex items-center space-x-2 flex-1"
          >
            <Copy className="w-4 h-4" />
            <span>{copiedScript === script ? 'Copied!' : 'Copy Script'}</span>
          </button>
          
          <button
            onClick={speakScript}
            disabled={isLoading}
            className="glass-button flex items-center space-x-2 flex-1"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen</span>
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-30 rounded-lg p-4">
        <h3 className="text-blue-300 font-semibold mb-2">💡 Tips for Use</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Practice these scripts beforehand</li>
          <li>• Speak calmly and clearly</li>
          <li>• Keep your hands visible</li>
          <li>• Don't argue or resist</li>
          <li>• Remember: your safety comes first</li>
        </ul>
      </div>
    </div>
  );
}
