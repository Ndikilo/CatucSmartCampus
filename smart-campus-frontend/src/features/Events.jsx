import React from 'react';

const Events = () => {
  const container = {
    maxWidth: '700px',
    margin: '3rem auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #9c27b0',
    borderRadius: '8px',
    backgroundColor: '#f3e5f5',
  };

  const heading = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#6a1b9a',
  };

  const events = [
    {
      id: 1,
      title: 'Spring Festival',
      date: '2025-04-15',
      description: 'Celebrate the arrival of spring with music, food, and games.',
    },
    {
      id: 2,
      title: 'Tech Symposium',
      date: '2025-05-20',
      description: 'Join us for talks and workshops on the latest in technology.',
    },
    {
      id: 3,
      title: 'Graduation Ceremony',
      date: '2025-06-30',
      description: 'Honoring our graduates for their hard work and achievements.',
    },
  ];

  const eventItem = {
    backgroundColor: '#fff',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  };

  const titleStyle = {
    fontWeight: '700',
    fontSize: '1.3rem',
    color: '#4a148c',
  };

  const dateStyle = {
    fontStyle: 'italic',
    color: '#7b1fa2',
    marginBottom: '0.5rem',
  };

  const descStyle = {
    fontSize: '1rem',
    color: '#333',
  };

  return (
    <div style={container}>
      <h1 style={heading}>Upcoming Events</h1>
      {events.map((event) => (
        <div key={event.id} style={eventItem}>
          <div style={titleStyle}>{event.title}</div>
          <div style={dateStyle}>{new Date(event.date).toLocaleDateString()}</div>
          <div style={descStyle}>{event.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Events;
