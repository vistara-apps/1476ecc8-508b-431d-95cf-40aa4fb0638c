'use client';

import { useState } from 'react';
import { Menu, X, Shield, Settings2 } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';

interface AppHeaderProps {
  variant?: 'default';
}

export function AppHeader({ variant = 'default' }: AppHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-card p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">RightsGuard</h1>
            <p className="text-sm text-gray-300">Know Your Rights, Stay Safe</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Wallet>
            <ConnectWallet className="glass-button text-sm">
              <Name />
            </ConnectWallet>
          </Wallet>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="glass-button p-2"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mt-4 pt-4 border-t border-white border-opacity-20">
          <nav className="space-y-2">
            <a
              href="#rights-guide"
              className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Rights Guide
            </a>
            <a
              href="#scripts"
              className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              De-escalation Scripts
            </a>
            <a
              href="#recording"
              className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Incident Recording
            </a>
            <a
              href="#emergency"
              className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Emergency Contacts
            </a>
            <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-colors duration-200">
              <Settings2 className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
