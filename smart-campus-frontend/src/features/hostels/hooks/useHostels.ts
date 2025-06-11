import { useState, useEffect, useCallback } from 'react';

// Sample data - in a real app, this would come from an API
const sampleHostels = [
  {
    id: 1,
    name: 'Unity Hall',
    type: 'Male',
    rating: 4.5,
    price: 300000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Modern hostel with excellent facilities and a vibrant community. Perfect for students who want a balance of study and social life.',
    amenities: ['WiFi', 'Cafeteria', 'Laundry', '24/7 Security', 'Gym', 'Study Room'],
    location: 'Main Campus, 5 min walk to Central Library',
    rooms: [
      { type: 'Single', price: 350000, available: 5 },
      { type: 'Double', price: 300000, available: 8 },
      { type: 'Triple', price: 250000, available: 3 },
    ],
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'unity.hall@campus.edu',
      officeHours: 'Mon-Fri: 9:00 AM - 5:00 PM'
    }
  },
  {
    id: 2,
    name: 'Harmony House',
    type: 'Female',
    rating: 4.8,
    price: 300000,
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'A peaceful and secure environment designed for female students. Features modern amenities and a supportive community.',
    amenities: ['WiFi', 'Cafeteria', 'Laundry', '24/7 Security', 'Study Room', 'Yoga Room'],
    location: 'North Campus, next to Student Center',
    rooms: [
      { type: 'Single', price: 350000, available: 3 },
      { type: 'Double', price: 300000, available: 5 },
    ],
    contact: {
      phone: '+1 (555) 123-4568',
      email: 'harmony.house@campus.edu',
      officeHours: 'Mon-Fri: 9:00 AM - 5:00 PM'
    }
  },
  {
    id: 3,
    name: 'Prestige Residences',
    type: 'Mixed',
    rating: 4.2,
    price: 275000,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Affordable housing option with all essential amenities. Great for students looking for a comfortable place to stay on a budget.',
    amenities: ['WiFi', 'Laundry', '24/7 Security', 'Common Kitchen'],
    location: 'East Campus, 10 min walk to Engineering Building',
    rooms: [
      { type: 'Double', price: 300000, available: 10 },
      { type: 'Triple', price: 275000, available: 7 },
      { type: 'Quad', price: 250000, available: 4 },
    ],
    contact: {
      phone: '+1 (555) 123-4569',
      email: 'prestige.residences@campus.edu',
      officeHours: 'Mon-Fri: 9:00 AM - 5:00 PM'
    }
  },
];

export const useHostels = () => {
  const [hostels, setHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHostels = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHostels(sampleHostels);
      setError(null);
    } catch (err) {
      setError('Failed to load hostels. Please try again later.');
      console.error('Error fetching hostels:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHostels();
  }, [fetchHostels]);

  return {
    hostels,
    loading,
    error,
    refetch: fetchHostels
  };
};
