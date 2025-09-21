export interface Property {
  id: number;
  type: 'House' | 'Apartment' | 'Condo' | 'Plot';
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  imageUrl: string;
  description: string;
  dateListed: string;
  isFavorited: boolean;
}

export interface Filters {
  location: string;
  propertyType: 'any' | 'house' | 'apartment' | 'condo' | 'plot';
  priceRange: [number, number];
  bedrooms: 'any' | '1' | '2' | '3' | '4' | '5+';
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'size-asc' | 'size-desc' | 'newest';

export interface AIFilters {
  location?: string;
  propertyType?: 'House' | 'Apartment' | 'Condo' | 'Plot';
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
}


export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}