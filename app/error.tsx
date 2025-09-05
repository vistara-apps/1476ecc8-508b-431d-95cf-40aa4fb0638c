'use client';

import { Shield, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-red-500 bg-opacity-20 border border-red-400 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-red-400" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
          <p className="text-gray-400">
            We encountered an error while loading RightsGuard. Your safety is our priority.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          
          <p className="text-xs text-gray-500">
            If the problem persists, please contact support at support@rightsguard.app
          </p>
        </div>
      </div>
    </div>
  );
}
