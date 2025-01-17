import axios from 'axios';

const fetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default fetch;
