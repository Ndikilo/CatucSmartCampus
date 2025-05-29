import React from 'react';

const ItLab = () => {
  const container = {
    maxWidth: '700px',
    margin: '3rem auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#eef6fb',
  };

  const heading = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#1a73e8',
  };

  const labInfo = [
    { id: 1, title: 'Available Software', details: 'VS Code, Git, Node.js, Python, Docker' },
    { id: 2, title: 'Lab Hours', details: 'Mon-Fri: 8:00 AM - 8:00 PM, Sat: 9:00 AM - 5:00 PM' },
    { id: 3, title: 'Lab Rules', details: 'No food or drinks, keep noise level low, reserve computers in advance.' },
  ];

  const infoBox = {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const titleStyle = {
    fontWeight: '600',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#0d47a1',
  };

  return (
    <div style={container}>
      <h1 style={heading}>IT Lab</h1>
      {labInfo.map(item => (
        <div key={item.id} style={infoBox}>
          <div style={titleStyle}>{item.title}</div>
          <p>{item.details}</p>
        </div>
      ))}
    </div>
  );
};

export default ItLab;
