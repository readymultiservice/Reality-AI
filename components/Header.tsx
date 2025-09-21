import React from 'react';
import { LogoIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <LogoIcon className="h-8 w-8 text-brand-blue" />
          <span className="text-2xl font-bold text-brand-blue">Realty AI</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Buy</a>
          <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Rent</a>
          <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Sell</a>
          <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Agents</a>
          <a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Blog</a>
        </nav>
        <div className="flex items-center space-x-4">
            <button className="hidden sm:block text-brand-blue font-semibold hover:text-blue-800 transition-colors">Log In</button>
            <button className="bg-brand-blue text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors shadow-sm">
                Sign Up
            </button>
        </div>
      </div>
    </header>
  );
};