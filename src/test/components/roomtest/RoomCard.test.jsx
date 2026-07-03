import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RoomCard from "../../../components/rooms/RoomCard";

const makeRoom = (overrides = {}) => ({
  room_id: 1,
  room_number: 101,
  type_name: 'Deluxe Suite',
  description: 'A lovely room',
  price_per_night: 200,
  rating: '4.5',
  reviewsCount: 10,
  is_available: true,
  amenities: ['Wi-Fi', 'Pool', 'Gym', 'Spa'],
  ...overrides
});

describe('RoomCard', () => {
  it('renders core room details', () => {
    render(<RoomCard room={makeRoom()} index={0} userRole="client" />);

    expect(screen.getByText('Deluxe Suite')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('shows only the first 3 amenities', () => {
    render(<RoomCard room={makeRoom()} index={0} userRole="client" />);

    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
    expect(screen.queryByText('Spa')).not.toBeInTheDocument();
  });

  it('shows the Edit and Delete buttons for admin role', () => {
    render(<RoomCard room={makeRoom()} index={0} userRole="admin" onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/Edit/)).toBeInTheDocument();
    expect(screen.getByText(/Delete/)).toBeInTheDocument();
  });

  it('hides the Edit and Delete buttons for client role', () => {
    render(<RoomCard room={makeRoom()} index={0} userRole="client" />);
    expect(screen.queryByText(/Edit/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Delete/)).not.toBeInTheDocument();
  });

  it('shows an "Available" badge when is_available is true', () => {
    render(<RoomCard room={makeRoom({ is_available: true })} index={0} userRole="client" />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('shows a "Booked" badge when is_available is false', () => {
    render(<RoomCard room={makeRoom({ is_available: false })} index={0} userRole="client" />);
    expect(screen.getByText('Booked')).toBeInTheDocument();
  });

  it('calls onSelect with the room when the card is clicked', () => {
    const onSelect = vi.fn();
    const room = makeRoom();
    render(<RoomCard room={room} index={0} userRole="client" onSelect={onSelect} />);

    fireEvent.click(screen.getByText('Deluxe Suite'));

    expect(onSelect).toHaveBeenCalledWith(room);
  });

  it('calls onEdit (not onSelect) when the Edit button is clicked, via stopPropagation', () => {
    const onSelect = vi.fn();
    const onEdit = vi.fn();
    const room = makeRoom();
    render(<RoomCard room={room} index={0} userRole="admin" onSelect={onSelect} onEdit={onEdit} />);

    fireEvent.click(screen.getByText(/Edit/));

    expect(onEdit).toHaveBeenCalledWith(room);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('calls onDelete (not onSelect) when the Delete button is clicked, via stopPropagation', () => {
    const onSelect = vi.fn();
    const onDelete = vi.fn();
    const room = makeRoom();
    render(<RoomCard room={room} index={0} userRole="admin" onSelect={onSelect} onDelete={onDelete} />);

    fireEvent.click(screen.getByText(/Delete/));

    expect(onDelete).toHaveBeenCalledWith(room);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('does not throw when onSelect/onEdit/onDelete are not provided', () => {
    const room = makeRoom();
    render(<RoomCard room={room} index={0} userRole="admin" />);
    expect(() => fireEvent.click(screen.getByText(/Edit/))).not.toThrow();
    expect(() => fireEvent.click(screen.getByText(/Delete/))).not.toThrow();
    expect(() => fireEvent.click(screen.getByText('Deluxe Suite'))).not.toThrow();
  });
});