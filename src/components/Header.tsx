import React from 'react';
import { Link } from 'react-router-dom';
import ConnectWalletButton from './ui/ConnectWalletButton';

/**
 * Main application header with navigation and wallet connection
 */
const Header: React.FC = () => {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-gray-800">
      {/* Logo and brand */}
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-3">
          <span className="text-xl font-bold text-white">C</span>
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
          CryptoFund
        </h1>
      </div>
      
      {/* Navigation */}
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/"
              className="text-white hover:text-purple-400 transition-colors font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/marketplace"
              className="text-white hover:text-purple-400 transition-colors font-medium"
            >
              Marketplace
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Wallet connection button */}
      <div>
        <ConnectWalletButton />
      </div>
    </header>
  );
};

export default Header; 