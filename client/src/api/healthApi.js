import axios from 'axios';

// Base URL of your Node.js/Express server
const API_URL = 'http://localhost:5000/api/logs';

export const getHealthLogs = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    // We reverse the data so the chart shows oldest to newest (left to right)
    return response.data.reverse();
  } catch (error) {
    console.error("API Error (Fetching):", error);
    throw error;
  }
};

export const createHealthLog = async (logData) => {
  try {
    const response = await axios.post(API_URL, logData);
    return response.data;
  } catch (error) {
    console.error("API Error (Posting):", error);
    throw error;
  }
};