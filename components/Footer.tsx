import React from 'react';
import { LogoIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <LogoIcon className="h-8 w-8" />
              <span className="text-2xl font-bold">Realty AI</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your intelligent partner in finding the perfect property. We use the latest technology to make your home search simple and efficient.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Buy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Rent</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sell</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Agents</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook"><FacebookIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter"><TwitterIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn"><LinkedInIcon className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-900 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Realty AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
