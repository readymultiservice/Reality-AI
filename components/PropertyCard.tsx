import React from 'react';
import type { Property } from '../types';
import { BedIcon, BathIcon, AreaIcon, LocationPinIcon, CompareIcon, HeartIcon } from './Icons';

interface PropertyCardProps {
  property: Property;
  onToggleCompare: (id: number) => void;
  isComparing: boolean;
  onToggleFavorite: (id: number) => void;
  onViewDetails: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onToggleCompare, isComparing, onToggleFavorite, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-gray-100 flex flex-col group">
      <div className="relative">
        <div 
          className="cursor-pointer"
          onClick={() => onViewDetails(property)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onViewDetails(property)}
          aria-label={`View details for ${property.address.street}`}
        >
          <img className="w-full h-56 object-cover" src={property.imageUrl} alt={`View of ${property.address.street}`} />
        </div>
        <div className="absolute top-3 left-3 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">{property.type}</div>
        <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
                onClick={() => onToggleCompare(property.id)}
                className={`bg-white/80 backdrop-blur-sm p-2 rounded-full transition-colors ${
                  isComparing ? 'text-red-500' : 'text-gray-600 hover:text-brand-blue'
                }`}
                aria-label={isComparing ? 'Remove from Compare' : 'Add to Compare'}
                aria-pressed={isComparing}
            >
                <CompareIcon className="h-5 w-5" />
            </button>
            <button 
                onClick={() => onToggleFavorite(property.id)} 
                className="bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors"
                aria-label={property.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={property.isFavorited}
            >
                <HeartIcon className={`h-5 w-5 ${property.isFavorited ? 'text-red-500 fill-current' : ''}`} />
            </button>
        </div>
      </div>
      <div 
        className="p-5 flex flex-col flex-grow cursor-pointer"
        onClick={() => onViewDetails(property)}
        role="button"
        tabIndex={-1}
      >
        <div className="flex-grow">
          <p className="text-2xl font-extrabold text-brand-blue mb-2">${property.price.toLocaleString()}</p>
          <h3 className="text-lg font-bold text-gray-800 leading-tight truncate group-hover:text-brand-teal transition-colors">{property.address.street}</h3>
          <p className="text-sm text-gray-500 flex items-center mt-1">
             <LocationPinIcon className="h-4 w-4 mr-1 text-gray-400" />
            {property.address.city}, {property.address.state}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <BedIcon className="h-5 w-5 text-brand-teal" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center space-x-2">
            <BathIcon className="h-5 w-5 text-brand-teal" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center space-x-2">
            <AreaIcon className="h-5 w-5 text-brand-teal" />
            <span>{property.area_sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};