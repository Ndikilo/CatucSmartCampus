import React from 'react';

const Admission = () => {
  const container = {
    maxWidth: '700px',
    margin: '3rem auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #bbb',
    borderRadius: '8px',
    backgroundColor: '#e8f5e9',
  };

  const heading = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2e7d32',
  };

  const admissionInfo = {
    overview: 'Welcome to the Admission page. Here you will find the steps and requirements for enrolling.',
    steps: [
      'Fill out the online application form.',
      'Submit necessary documents (transcripts, ID, etc).',
      'Attend the entrance interview.',
      'Wait for admission decision.',
    ],
    contact: {
      email: 'admissions@srm-system.edu',
      phone: '+1 555-123-4567',
    },
  };

  const listStyle = {
    paddingLeft: '1.2rem',
  };

  const contactStyle = {
    marginTop: '2rem',
    fontWeight: 'bold',
  };

  return (
    <div style={container}>
      <h1 style={heading}>Admission</h1>
      <p>{admissionInfo.overview}</p>

      <h3>Admission Steps:</h3>
      <ol style={listStyle}>
        {admissionInfo.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <div style={contactStyle}>
        <p>Contact us at:</p>
        <p>Email: {admissionInfo.contact.email}</p>
        <p>Phone: {admissionInfo.contact.phone}</p>
      </div>
    </div>
  );
};

export default Admission;
