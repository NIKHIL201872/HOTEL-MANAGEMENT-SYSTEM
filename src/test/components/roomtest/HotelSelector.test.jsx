import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HotelSelector from "../../../components/rooms/HotelSelector";
import { useRoomStore } from '../../../store/roomStore';

// Initialize a base mock store configuration object
let mockStoreState = {
  selectedHotelId: 'all',
  setSelectedHotelId: vi.fn(),
  hotels: []
};

// Mock the store to return the dynamic state object directly on invocation
vi.mock('../../../store/roomStore', () => ({
  useRoomStore: vi.fn(() => mockStoreState)
}));

describe('HotelSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset our mock state structure cleanly before every run
    mockStoreState = {
      selectedHotelId: 'all',
      setSelectedHotelId: vi.fn(),
      hotels: []
    };
  });

  it('deduplicates hotels that share the same name', () => {
    mockStoreState.hotels = [
      { hotel_id: 1, name: 'Grand Hotel', location: 'NYC' },
      { hotel_id: 2, name: 'Grand Hotel', location: 'LA' }, // Overwrites 'Grand Hotel' key in Map
      { hotel_id: 3, name: 'Ocean View', location: 'Miami' }
    ];

    render(<HotelSelector />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    
    // Expect the last duplicate entry ('LA') to remain after Map deduplication
    expect(screen.getByText('Grand Hotel — LA')).toBeInTheDocument();
    expect(screen.queryByText('Grand Hotel — NYC')).not.toBeInTheDocument();
    expect(screen.getByText('Ocean View — Miami')).toBeInTheDocument();
  });

  it('calls setSelectedHotelId when a hotel is selected', () => {
    mockStoreState.hotels = [{ hotel_id: 1, name: 'Grand Hotel', location: 'NYC' }];

    render(<HotelSelector />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    expect(mockStoreState.setSelectedHotelId).toHaveBeenCalledWith('1');
  });

  it('calls onChangePage(1) when provided and the selection changes', () => {
    mockStoreState.hotels = [{ hotel_id: 1, name: 'Grand Hotel', location: 'NYC' }];
    const onChangePage = vi.fn();

    render(<HotelSelector onChangePage={onChangePage} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    expect(onChangePage).toHaveBeenCalledWith(1);
  });

  it('does not throw when onChangePage is not provided', () => {
    mockStoreState.hotels = [{ hotel_id: 1, name: 'Grand Hotel', location: 'NYC' }];

    render(<HotelSelector />);
    expect(() => fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } })).not.toThrow();
  });
});