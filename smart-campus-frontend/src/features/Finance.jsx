import React from 'react';

const Finance = () => {
  const container = {
    maxWidth: '700px',
    margin: '3rem auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  };

  const heading = {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#2c3e50',
  };

  const infoBox = {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '6px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  };

  return (
    <div style={container}>
      <h1 style={heading}>Finance Department</h1>
      <div style={infoBox}>
        <h3>Tuition Fees</h3>
        <p>Payment deadlines: August 1st and January 15th.</p>
        <p>Late payment fees apply after due dates.</p>
      </div>
      <div style={infoBox}>
        <h3>Scholarships</h3>
        <p>Applications open every March.</p>
        <p>Contact the finance office for eligibility criteria.</p>
      </div>
      <div style={infoBox}>
        <h3>Contact Info</h3>
        <p>Email: finance@school.edu</p>
        <p>Phone: +1 (555) 123-4567</p>
      </div>
    </div>
  );
};

export default Finance;
