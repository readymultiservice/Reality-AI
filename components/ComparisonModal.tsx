import React from 'react';
import type { Property } from '../types';
import { CloseIcon } from './Icons';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
}

const features: { label: string; key: keyof Property | keyof Property['address']; format?: (val: any) => React.ReactNode }[] = [
  { label: 'Price', key: 'price', format: (p) => `$${p.toLocaleString()}` },
  { label: 'Property Type', key: 'type' },
  { label: 'Address', key: 'street' },
  { label: 'Bedrooms', key: 'bedrooms' },
  { label: 'Bathrooms', key: 'bathrooms' },
  { label: 'Area (sqft)', key: 'area_sqft', format: (a) => a.toLocaleString() },
];

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, properties }) => {
  if (!isOpen) return null;

  const getPropertyValue = (prop: Property, key: string) => {
      if (key === 'street') return prop.address.street;
      return (prop as any)[key];
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h2 id="comparison-title" className="text-2xl font-bold text-brand-blue">Property Comparison</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close comparison">
            <CloseIcon className="h-6 w-6 text-gray-600" />
          </button>
        </header>

        <div className="flex-grow overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr>
                <th className="p-4 sm:p-6 font-semibold text-gray-600 w-[20%] min-w-[120px]">Feature</th>
                {properties.map(prop => (
                  <th key={prop.id} className="p-4 sm:p-6 font-semibold text-gray-800 border-l border-gray-200">
                    <img src={prop.imageUrl} alt={prop.address.street} className="w-full h-32 object-cover rounded-lg mb-2"/>
                    <p className="text-brand-blue font-bold">{prop.address.street}</p>
                    <p className="text-sm text-gray-500">{prop.address.city}, {prop.address.state}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {features.map(feature => (
                <tr key={feature.key}>
                  <td className="p-4 sm:p-6 font-semibold text-gray-700">{feature.label}</td>
                  {properties.map(prop => (
                    <td key={prop.id} className="p-4 sm:p-6 text-gray-800 border-l border-gray-200">
                      {feature.format 
                        ? feature.format(getPropertyValue(prop, feature.key)) 
                        : getPropertyValue(prop, feature.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};