import React from 'react';
import type { Property } from '../types';
import { CompareIcon, TrashIcon, CloseIcon } from './Icons';

interface ComparisonTrayProps {
  properties: Property[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onCompare: () => void;
}

export const ComparisonTray: React.FC<ComparisonTrayProps> = ({ properties, onRemove, onClear, onCompare }) => {
  const canCompare = properties.length >= 2;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)] p-4 z-40 transform transition-transform duration-300 ease-in-out">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex-grow flex items-center gap-4 overflow-x-auto pb-2 sm:pb-0 min-h-[6rem] w-full">
            <h3 className="text-lg font-bold text-brand-blue hidden lg:block whitespace-nowrap">Compare Properties ({properties.length}/4)</h3>
            {properties.map(prop => (
              <div key={prop.id} className="relative flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden group">
                <img src={prop.imageUrl} alt={prop.address.street} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onRemove(prop.id)} className="text-white bg-red-500 rounded-full p-1.5 hover:bg-red-600" aria-label={`Remove ${prop.address.street} from comparison`}>
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {properties.length < 4 && Array.from({ length: 4 - properties.length }).map((_, index) => (
               <div key={`placeholder-${index}`} className="hidden sm:block flex-shrink-0 w-24 h-24 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-xs text-center p-2">Add a property</span>
               </div>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button onClick={onClear} className="px-4 py-3 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              <TrashIcon className="h-5 w-5 inline-block sm:hidden" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
            <button 
              onClick={onCompare} 
              disabled={!canCompare} 
              className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold text-white bg-brand-teal rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CompareIcon className="h-5 w-5" />
              Compare ({properties.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};