'use client';

import { useState, useEffect, useRef } from 'react';
import { Video, Mic, Square, Play, Pause, Loader2, MapPin } from 'lucide-react';
import { Incident, LocationData, RecordingData } from '@/lib/types';
import { getCurrentLocation, generateId, storage, MediaRecorderHelper } from '@/lib/utils';

export function IncidentRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'audio' | 'video'>('audio');
  const [currentIncident, setCurrentIncident] = useState<Incident | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorderHelper | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Get current location when component mounts
    getCurrentLocation()
      .then(setLocation)
      .catch(console.error);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setIsLoading(true);
      
      // Get current location
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      // Create new incident
      const incident: Incident = {
        incidentId: generateId(),
        userId: 'current-user', // In real app, get from auth
        startTime: new Date().toISOString(),
        location: currentLocation,
        notes: '',
        status: 'active',
      };

      setCurrentIncident(incident);

      // Initialize media recorder
      mediaRecorderRef.current = new MediaRecorderHelper();
      await mediaRecorderRef.current.startRecording(recordingType);

      setIsRecording(true);
      setRecordingDuration(0);

      // Start duration timer
      intervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      // Save incident to storage
      const incidents = storage.get('incidents') || [];
      incidents.push(incident);
      storage.set('incidents', incidents);

    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to start recording. Please check permissions and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current || !currentIncident) return;

    try {
      setIsLoading(true);

      // Stop recording
      const recordingBlob = await mediaRecorderRef.current.stopRecording();
      
      // Create recording URL (in real app, upload to cloud storage)
      const recordingUrl = URL.createObjectURL(recordingBlob);

      // Update incident
      const updatedIncident: Incident = {
        ...currentIncident,
        endTime: new Date().toISOString(),
        recordingUrl,
        notes,
        status: 'completed',
      };

      // Save updated incident
      const incidents = storage.get('incidents') || [];
      const incidentIndex = incidents.findIndex((i: Incident) => i.incidentId === currentIncident.incidentId);
      if (incidentIndex >= 0) {
        incidents[incidentIndex] = updatedIncident;
        storage.set('incidents', incidents);
      }

      // Save recording data
      const recordingData: RecordingData = {
        id: generateId(),
        incidentId: currentIncident.incidentId,
        type: recordingType,
        url: recordingUrl,
        duration: recordingDuration,
        createdAt: new Date().toISOString(),
      };

      const recordings = storage.get('recordings') || [];
      recordings.push(recordingData);
      storage.set('recordings', recordings);

      setIsRecording(false);
      setCurrentIncident(null);
      setNotes('');
      setRecordingDuration(0);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

    } catch (error) {
      console.error('Failed to stop recording:', error);
      alert('Failed to stop recording properly.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Incident Recording</h2>
        {isRecording && (
          <div className="flex items-center space-x-2">
            <div className="recording-indicator" />
            <span className="text-red-400 font-mono">{formatDuration(recordingDuration)}</span>
          </div>
        )}
      </div>

      {/* Recording Type Selection */}
      {!isRecording && (
        <div className="flex space-x-3">
          <button
            onClick={() => setRecordingType('audio')}
            className={`glass-button flex items-center space-x-2 flex-1 ${
              recordingType === 'audio' ? 'bg-purple-500 bg-opacity-30 border-purple-400' : ''
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Audio Only</span>
          </button>
          
          <button
            onClick={() => setRecordingType('video')}
            className={`glass-button flex items-center space-x-2 flex-1 ${
              recordingType === 'video' ? 'bg-purple-500 bg-opacity-30 border-purple-400' : ''
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video</span>
          </button>
        </div>
      )}

      {/* Location Display */}
      {location && (
        <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-sm text-white">Current Location</p>
              <p className="text-xs text-gray-400">
                {location.address || `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notes Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Incident Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any relevant details about the incident..."
          className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          rows={3}
          disabled={isRecording}
        />
      </div>

      {/* Recording Controls */}
      <div className="flex space-x-3">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Starting...</span>
              </>
            ) : (
              <>
                {recordingType === 'video' ? <Video className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                <span>Start Recording</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={stopRecording}
            disabled={isLoading}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Stopping...</span>
              </>
            ) : (
              <>
                <Square className="w-6 h-6" />
                <span>Stop Recording</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Safety Notice */}
      <div className="bg-yellow-500 bg-opacity-20 border border-yellow-400 border-opacity-30 rounded-lg p-4">
        <h3 className="text-yellow-300 font-semibold mb-2">⚠️ Safety First</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Keep your device discreet and secure</li>
          <li>• Don't announce that you're recording</li>
          <li>• Follow your state's recording laws</li>
          <li>• Your safety is more important than the recording</li>
        </ul>
      </div>
    </div>
  );
}
