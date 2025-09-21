import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { PropertyList } from './components/PropertyList';
import { AIChatbot } from './components/AIChatbot';
import { ComparisonTray } from './components/ComparisonTray';
import { ComparisonModal } from './components/ComparisonModal';
import { MortgageCalculator } from './components/MortgageCalculator';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { PopularLocations } from './components/PopularLocations';
import { Footer } from './components/Footer';
import { Sitemap } from './components/Sitemap';
import { SortIcon } from './components/Icons';
import { initialProperties } from './constants';
import type { Property, Filters, AIFilters, SortOption } from './types';

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [filters, setFilters] = useState<Filters>({
    location: '',
    propertyType: 'any',
    priceRange: [0, 2000000],
    bedrooms: 'any',
  });
  const [comparisonList, setComparisonList] = useState<number[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const propertiesSectionRef = useRef<HTMLDivElement>(null);
  
  const applyFilters = useCallback(() => {
    let filtered = properties;

    if (filters.location) {
      filtered = filtered.filter(p => 
        p.address.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.address.state.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.address.zip.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.propertyType !== 'any') {
      filtered = filtered.filter(p => p.type.toLowerCase() === filters.propertyType);
    }

    if (filters.bedrooms !== 'any') {
      const minBedrooms = filters.bedrooms === '5+' ? 5 : parseInt(filters.bedrooms, 10);
      filtered = filtered.filter(p => p.bedrooms >= minBedrooms);
    }

    filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    
    setFilteredProperties(filtered);
  }, [filters, properties]);

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);
  
  const sortedProperties = useMemo(() => {
    const propertiesToSort = [...filteredProperties];
    switch (sortOption) {
      case 'price-asc':
        return propertiesToSort.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return propertiesToSort.sort((a, b) => b.price - a.price);
      case 'size-desc':
        return propertiesToSort.sort((a, b) => b.area_sqft - a.area_sqft);
      case 'size-asc':
        return propertiesToSort.sort((a, b) => a.area_sqft - b.area_sqft);
      case 'newest':
        return propertiesToSort.sort((a, b) => new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime());
      case 'default':
      default:
        return propertiesToSort.sort((a,b) => a.id - b.id);
    }
  }, [filteredProperties, sortOption]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const handleAIFilterUpdate = (aiFilters: AIFilters) => {
      console.log("Applying AI filters:", aiFilters);
      const newFilters: Partial<Filters> = {};
      
      if(aiFilters.location) newFilters.location = aiFilters.location;
      if(aiFilters.propertyType) newFilters.propertyType = aiFilters.propertyType.toLowerCase() as Filters['propertyType'];
      if(aiFilters.bedrooms && aiFilters.bedrooms > 0) {
        if (aiFilters.bedrooms >= 5) {
          newFilters.bedrooms = '5+';
        } else {
          newFilters.bedrooms = aiFilters.bedrooms.toString() as '1' | '2' | '3' | '4';
        }
      }
      if(aiFilters.maxPrice) newFilters.priceRange = [aiFilters.minPrice || 0, aiFilters.maxPrice];
      else if(aiFilters.minPrice) newFilters.priceRange = [aiFilters.minPrice, filters.priceRange[1]];
      
      setFilters(prev => ({...prev, ...newFilters}));
  };
  
  const handleToggleCompare = (propertyId: number) => {
    setComparisonList(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      }
      if (prev.length < 4) {
        return [...prev, propertyId];
      }
      alert("You can only compare up to 4 properties at a time.");
      return prev;
    });
  };

  const handleToggleFavorite = (propertyId: number) => {
    setProperties(prevProperties =>
      prevProperties.map(p =>
        p.id === propertyId ? { ...p, isFavorited: !p.isFavorited } : p
      )
    );
     setFilteredProperties(prevProperties =>
      prevProperties.map(p =>
        p.id === propertyId ? { ...p, isFavorited: !p.isFavorited } : p
      )
    );
  };

  const handleClearCompare = () => {
    setComparisonList([]);
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  const handleLocationSelect = (location: string) => {
    handleFilterChange({ location });
    propertiesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const propertiesToCompare = properties.filter(p => comparisonList.includes(p.id));


  return (
    <div className={`bg-brand-light min-h-screen font-sans text-brand-dark transition-all duration-300 ${comparisonList.length > 0 ? 'pb-32 sm:pb-28' : ''}`}>
      <Header />
      <Hero>
        <SearchBar filters={filters} onFilterChange={handleFilterChange} />
      </Hero>
      <main className="container mx-auto px-4 py-8">
        <PopularLocations onLocationSelect={handleLocationSelect} />
        <MortgageCalculator />

        <div ref={propertiesSectionRef} className="flex flex-col sm:flex-row justify-between items-center my-8 pt-4">
            <p className="text-md text-gray-700 mb-4 sm:mb-0">
              Showing <span className="font-bold text-brand-blue">{sortedProperties.length}</span> of <span className="font-bold text-brand-blue">{properties.length}</span> properties
            </p>
            <div className="relative w-full sm:w-auto">
              <label htmlFor="sort-properties" className="sr-only">Sort Properties</label>
              <SortIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                id="sort-properties"
                value={sortOption}
                onChange={handleSortChange}
                className="appearance-none w-full sm:w-auto bg-white border border-gray-200 text-gray-700 py-2 pl-10 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-brand-teal transition-shadow"
                aria-label="Sort properties"
              >
                <option value="default">Default Order</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="size-desc">Size: Largest First</option>
                <option value="size-asc">Size: Smallest First</option>
              </select>
            </div>
        </div>

        <PropertyList 
          properties={sortedProperties}
          comparisonList={comparisonList}
          onToggleCompare={handleToggleCompare}
          onToggleFavorite={handleToggleFavorite}
          onViewDetails={handleViewDetails}
        />
        <Sitemap />
      </main>
      <Footer />
      <AIChatbot onFiltersExtracted={handleAIFilterUpdate} />
      
      {comparisonList.length > 0 && (
        <ComparisonTray 
          properties={propertiesToCompare}
          onRemove={handleToggleCompare}
          onClear={handleClearCompare}
          onCompare={() => setIsComparisonModalOpen(true)}
        />
      )}

      <ComparisonModal 
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        properties={propertiesToCompare}
      />

      <PropertyDetailModal 
        property={selectedProperty}
        onClose={handleCloseDetails}
      />
    </div>
  );
};

export default App;