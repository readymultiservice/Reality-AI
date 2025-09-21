import React from 'react';
import type { Filters } from '../types';
import { SearchIcon, LocationIcon, PriceIcon, BedIcon } from './Icons';

interface SearchBarProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}

const propertyTypes: { value: Filters['propertyType']; label: string }[] = [
    { value: 'any', label: 'Any Type' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'plot', label: 'Plot' }
];

export const SearchBar: React.FC<SearchBarProps> = ({ filters, onFilterChange }) => {
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onFilterChange({ priceRange: [filters.priceRange[0], value] });
  };
    
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-200">
      <div className="flex flex-col gap-4">
         <div className="flex flex-wrap gap-2">
            {propertyTypes.map(pt => (
                 <button 
                    key={pt.value} 
                    onClick={() => onFilterChange({ propertyType: pt.value })}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                        filters.propertyType === pt.value 
                        ? 'bg-brand-blue text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    {pt.label}
                </button>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Location Input */}
            <div className="relative col-span-1 md:col-span-2">
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
              <div className="relative">
                <LocationIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  placeholder="Enter city, state, or zip..."
                  value={filters.location}
                  onChange={e => onFilterChange({ location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="relative">
              <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-700 mb-1">Bedrooms</label>
               <div className="relative">
                 <BedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  id="bedrooms"
                  value={filters.bedrooms}
                  onChange={e => onFilterChange({ bedrooms: e.target.value as Filters['bedrooms'] })}
                  className="w-full appearance-none pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-shadow bg-white"
                >
                  <option value="any">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5+">5+</option>
                </select>
               </div>
            </div>
            
            {/* Price Range */}
            <div className="relative">
                <label htmlFor="priceRange" className="block text-sm font-semibold text-gray-700 mb-1">Max Price</label>
                <div className="relative">
                   <PriceIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                   <input
                     type="text"
                     readOnly
                     value={`$${filters.priceRange[1].toLocaleString()}`}
                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer"
                   />
                </div>
            </div>

            {/* Search Button */}
            <div>
               <button className="w-full flex items-center justify-center bg-brand-teal text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300 shadow-md">
                <SearchIcon className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>
        </div>

        {/* Price Range Slider */}
        <div className="pt-2">
          <label htmlFor="priceRangeSlider" className="sr-only">Max Price Slider</label>
          <input
            type="range"
            id="priceRangeSlider"
            min="0"
            max="2000000"
            step="50000"
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-teal"
          />
        </div>
      </div>
    </div>
  );
};