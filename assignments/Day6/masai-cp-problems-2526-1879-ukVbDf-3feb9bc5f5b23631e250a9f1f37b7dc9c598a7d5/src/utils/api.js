// manage api requests here
// utils/api.js
import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/books');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from the server');
  }
};
