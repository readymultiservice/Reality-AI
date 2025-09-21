import React from 'react';
import { BuildingIcon } from './Icons';

interface PopularLocationsProps {
    onLocationSelect: (location: string) => void;
}

const locations = [
    { name: 'Los Angeles', image: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'San Francisco', image: 'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'San Diego', image: 'https://images.pexels.com/photos/1190159/pexels-photo-1190159.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Malibu', image: 'https://images.pexels.com/photos/1569076/pexels-photo-1569076.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export const PopularLocations: React.FC<PopularLocationsProps> = ({ onLocationSelect }) => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg my-12 border border-gray-100">
            <div className="text-center mb-10">
                <BuildingIcon className="mx-auto h-12 w-12 text-brand-blue mb-2" />
                <h2 className="text-3xl font-extrabold text-brand-blue">Explore Popular Locations</h2>
                <p className="text-md text-gray-500 mt-2">Start your search in one of these top real estate markets.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {locations.map(location => (
                    <button 
                        key={location.name} 
                        onClick={() => onLocationSelect(location.name)}
                        className="relative rounded-lg overflow-hidden h-40 group text-white font-bold text-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                    >
                        <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors duration-300 flex items-center justify-center">
                            <span>{location.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
