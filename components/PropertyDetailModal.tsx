import React from 'react';
import type { Property } from '../types';
import { CloseIcon, BedIcon, BathIcon, AreaIcon, LocationPinIcon, MailIcon } from './Icons';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-detail-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img 
            src={property.imageUrl} 
            alt={`View of ${property.address.street}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex-grow p-6 md:p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-teal-100 text-brand-teal text-sm font-semibold px-3 py-1 rounded-full mb-2">
                  For Sale
                </span>
                <h2 id="property-detail-title" className="text-3xl font-bold text-brand-blue">{property.address.street}</h2>
                <p className="text-md text-gray-500 flex items-center mt-1">
                  <LocationPinIcon className="h-5 w-5 mr-1 text-gray-400" />
                  {property.address.city}, {property.address.state} {property.address.zip}
                </p>
              </div>
              <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full hover:bg-gray-100 hidden sm:block" aria-label="Close property details">
                <CloseIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <p className="text-4xl font-extrabold text-brand-blue my-4">${property.price.toLocaleString()}</p>
            
            <div className="grid grid-cols-3 gap-4 text-center my-6 py-4 border-y border-gray-200">
              <div>
                <BedIcon className="h-7 w-7 text-brand-teal mx-auto mb-1" />
                <p className="font-bold text-lg text-gray-800">{property.bedrooms}</p>
                <p className="text-xs text-gray-500">Bedrooms</p>
              </div>
              <div>
                <BathIcon className="h-7 w-7 text-brand-teal mx-auto mb-1" />
                <p className="font-bold text-lg text-gray-800">{property.bathrooms}</p>
                <p className="text-xs text-gray-500">Bathrooms</p>
              </div>
              <div>
                <AreaIcon className="h-7 w-7 text-brand-teal mx-auto mb-1" />
                <p className="font-bold text-lg text-gray-800">{property.area_sqft.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Sqft</p>
              </div>
            </div>

            <h3 className="font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
          </div>

          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200 flex-shrink-0">
            <button className="w-full flex items-center justify-center bg-brand-teal text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300 shadow-md">
                <MailIcon className="h-5 w-5 mr-3" />
                Contact Agent
            </button>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/70 hover:bg-white sm:hidden" aria-label="Close property details">
            <CloseIcon className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
};