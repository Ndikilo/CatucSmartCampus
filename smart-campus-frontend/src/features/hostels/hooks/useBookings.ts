import { useState, useCallback } from 'react';

interface Booking {
  id: string;
  hostelId: number;
  hostelName: string;
  roomType: string;
  studentName: string;
  studentId: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  startDate: string;
  endDate: string;
  createdAt: string;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = useCallback(async (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newBooking: Booking = {
        ...bookingData,
        id: `booking-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        startDate: new Date().toISOString(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
      };
      
      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error('Error creating booking:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getActiveBookings = useCallback(() => {
    return bookings.filter(booking => 
      booking.status === 'approved' && 
      new Date(booking.endDate) > new Date()
    );
  }, [bookings]);

  const getRecentBookings = useCallback((limit = 5) => {
    return [...bookings]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }, [bookings]);

  return {
    createBooking,
    getActiveBookings,
    getRecentBookings,
    bookings,
    loading,
    error
  };
};
