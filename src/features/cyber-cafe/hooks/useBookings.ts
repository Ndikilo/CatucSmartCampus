import { useState, useCallback } from 'react';
import { Booking } from '../types';
import { RATES } from '../constants';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createBooking = useCallback(
    (deviceId: number, deviceName: string, userName: string, duration: number, specs: string) => {
      setIsLoading(true);
      
      // Simulate API call
      return new Promise<Booking>((resolve) => {
        setTimeout(() => {
          const isPremium = specs.includes('32GB');
          const newBooking: Booking = {
            id: Date.now(),
            computerId: deviceId,
            computerName: deviceName,
            userName,
            startTime: new Date(),
            duration,
            totalCost: (isPremium ? RATES.PREMIUM : RATES.STANDARD) * duration,
            status: 'active',
          };

          setBookings((prev) => [...prev, newBooking]);
          setIsLoading(false);
          resolve(newBooking);
        }, 500);
      });
    },
    []
  );

  const endBooking = useCallback((bookingId: number) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'completed', endTime: new Date() }
          : booking
      )
    );
  }, []);

  const getActiveBookings = useCallback(
    () => bookings.filter((booking) => booking.status === 'active'),
    [bookings]
  );

  const getRecentBookings = useCallback(
    (limit = 5) =>
      bookings
        .filter((booking) => booking.status === 'completed')
        .sort((a, b) => (b.endTime?.getTime() || 0) - (a.endTime?.getTime() || 0))
        .slice(0, limit),
    [bookings]
  );

  return {
    bookings,
    isLoading,
    createBooking,
    endBooking,
    getActiveBookings,
    getRecentBookings,
  };
};
