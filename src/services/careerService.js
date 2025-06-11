import axios from 'axios';

const API_URL = 'http://localhost:3001'; // JSON Server default port

// Get all jobs
export const getJobs = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/jobs`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // Return mock data if API is not available
    return [];
  }
};

// Get job by ID
export const getJobById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job ${id}:`, error);
    return null;
  }
};

// Save/unsave job
export const toggleSaveJob = async (jobId) => {
  try {
    // In a real app, this would be a PATCH request
    // For demo, we'll just simulate success
    return { success: true, saved: true };
  } catch (error) {
    console.error('Error toggling save job:', error);
    return { success: false };
  }
};

// Apply for job
export const applyForJob = async (jobId, applicationData) => {
  try {
    // In a real app, this would be a POST request
    // For demo, we'll just simulate success
    return { success: true, applied: true };
  } catch (error) {
    console.error('Error applying for job:', error);
    return { success: false };
  }
};

// Get career resources
export const getResources = async () => {
  try {
    const response = await axios.get(`${API_URL}/resources`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    // Return empty array if API is not available
    return [];
  }
};

// Get career events
export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    // Return empty array if API is not available
    return [];
  }
};

// Register for event
export const registerForEvent = async (eventId) => {
  try {
    // In a real app, this would be a POST request
    // For demo, we'll just simulate success
    return { success: true, registered: true };
  } catch (error) {
    console.error('Error registering for event:', error);
    return { success: false };
  }
};

// Get career advisors
export const getAdvisors = async () => {
  try {
    const response = await axios.get(`${API_URL}/advisors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching advisors:', error);
    // Return empty array if API is not available
    return [];
  }
};

// Schedule appointment with advisor
export const scheduleAppointment = async (advisorId, appointmentData) => {
  try {
    // In a real app, this would be a POST request
    // For demo, we'll just simulate success
    return { 
      success: true, 
      appointment: {
        id: Date.now(),
        advisorId,
        ...appointmentData,
        status: 'scheduled'
      }
    };
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    return { success: false };
  }
};
