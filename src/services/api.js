import axios from "axios";

const API_URL = "http://localhost:3001/";

const testAPI = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    post: { "Content-Type": "text/plain" },
    put: { "Content-Type": "text/plain" },
  },
});
export const getUsers = () => testAPI.get(`/users/`);

export const updateUser = (updatedUser, id) =>
  testAPI.put(`/users/${id}`, updatedUser);

export const addUser = (user) => testAPI.post(`/users`, user);
