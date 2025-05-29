import React from 'react';

const HelpAndSupport = () => {
  const container = {
    maxWidth: '700px',
    margin: '3rem auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #0288d1',
    borderRadius: '8px',
    backgroundColor: '#e1f5fe',
  };

  const heading = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#0277bd',
  };

  const supportTopics = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'Click on the "Forgot Password" link on the login page and follow the instructions.',
    },
    {
      id: 2,
      question: 'Where can I find my course materials?',
      answer: 'Course materials are available under the "Academics" section after you log in.',
    },
    {
      id: 3,
      question: 'How do I contact technical support?',
      answer: 'You can reach technical support at support@smartcampus.edu or call +1 555-123-4567.',
    },
  ];

  const topicStyle = {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#b3e5fc',
    borderRadius: '6px',
  };

  const questionStyle = {
    fontWeight: 'bold',
    color: '#01579b',
  };

  const answerStyle = {
    marginTop: '0.5rem',
    color: '#333',
  };

  return (
    <div style={container}>
      <h1 style={heading}>Help & Support</h1>
      {supportTopics.map(({ id, question, answer }) => (
        <div key={id} style={topicStyle}>
          <div style={questionStyle}>{question}</div>
          <div style={answerStyle}>{answer}</div>
        </div>
      ))}
    </div>
  );
};

export default HelpAndSupport;
