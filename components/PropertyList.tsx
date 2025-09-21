import React from 'react';
import type { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { NoResultsIcon } from './Icons';

interface PropertyListProps {
  properties: Property[];
  comparisonList: number[];
  onToggleCompare: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onViewDetails: (property: Property) => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties, comparisonList, onToggleCompare, onToggleFavorite, onViewDetails }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <NoResultsIcon className="mx-auto h-24 w-24 text-gray-300" />
        <h3 className="mt-4 text-2xl font-semibold text-brand-blue">No Properties Found</h3>
        <p className="mt-2 text-gray-500">Try adjusting your search filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {properties.map(property => (
        <PropertyCard 
          key={property.id} 
          property={property}
          onToggleCompare={onToggleCompare}
          isComparing={comparisonList.includes(property.id)}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};