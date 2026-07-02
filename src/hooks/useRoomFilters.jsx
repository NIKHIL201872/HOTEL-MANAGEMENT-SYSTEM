import { useState } from 'react';

export function useRoomFilters() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(900);
  const [minOccupancy, setMinOccupancy] = useState(1);
  const [adminAvailabilityFilter, setAdminAvailabilityFilter] = useState('all');

  const handleTypeCheckboxChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setMinRating(0);
    setMaxPrice(900);
    setMinOccupancy(1);
    setAdminAvailabilityFilter('all');
  };

  return {
    selectedTypes,
    minRating,
    maxPrice,
    minOccupancy,
    adminAvailabilityFilter,
    setSelectedTypes,
    setMinRating,
    setMaxPrice,
    setMinOccupancy,
    setAdminAvailabilityFilter,
    handleTypeCheckboxChange,
    clearFilters
  };
}