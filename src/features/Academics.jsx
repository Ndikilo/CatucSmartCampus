import React from 'react';

const Academics = () => {
  const container = {
    maxWidth: '720px',
    margin: '3rem auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
  };

  const heading = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#34495e',
  };

  const courseList = [
    { id: 1, name: 'Mathematics 101', instructor: 'Dr. Smith', schedule: 'Mon & Wed 10:00 AM - 11:30 AM' },
    { id: 2, name: 'English Literature', instructor: 'Prof. Johnson', schedule: 'Tue & Thu 1:00 PM - 2:30 PM' },
    { id: 3, name: 'Computer Science', instructor: 'Dr. Lee', schedule: 'Mon, Wed & Fri 9:00 AM - 10:00 AM' },
  ];

  const courseItem = {
    borderBottom: '1px solid #ddd',
    padding: '12px 0',
  };

  const courseTitle = {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  };

  const courseDetails = {
    fontStyle: 'italic',
    color: '#555',
  };

  return (
    <div style={container}>
      <h1 style={heading}>Academics</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {courseList.map(course => (
          <li key={course.id} style={courseItem}>
            <div style={courseTitle}>{course.name}</div>
            <div style={courseDetails}>
              Instructor: {course.instructor} <br />
              Schedule: {course.schedule}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Academics;
