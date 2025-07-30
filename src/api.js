import axios from "axios";

const BASE_URL = "https://student-managementsystem-6xz7.onrender.com";

export const registerUser = async (formData) => {
  return await axios.post(`${BASE_URL}/api/auth/register`, formData);
};

export const loginUser = async (formData) => {
  return await axios.post(`${BASE_URL}/api/auth/login`, formData);
};
