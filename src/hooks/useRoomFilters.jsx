import { useState, useMemo, useCallback } from 'react';

export function useRoomFilters() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(900);
  const [minOccupancy, setMinOccupancy] = useState(1);
  const [adminAvailabilityFilter, setAdminAvailabilityFilter] = useState('all');

  const handleTypeCheckboxChange = useCallback((type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedTypes([]);
    setMinRating(0);
    setMaxPrice(900);
    setMinOccupancy(1);
    setAdminAvailabilityFilter('all');
  }, []);

  // Memoized so consumers (e.g. useFilteredRooms) get a stable reference
  // unless a value actually changed - otherwise a new object was created
  // on every render, which silently defeated any downstream useMemo.
  return useMemo(() => ({
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
  }), [
    selectedTypes,
    minRating,
    maxPrice,
    minOccupancy,
    adminAvailabilityFilter,
    handleTypeCheckboxChange,
    clearFilters
  ]);
}