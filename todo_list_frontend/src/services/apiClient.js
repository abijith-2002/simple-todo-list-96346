import axios from 'axios';
import { API_BASE_URL } from '../config';

const STORAGE_KEY = 'auth_token';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// PUBLIC_INTERFACE
export function setAuthToken(token) {
  /** Stores auth token and ensures subsequent requests use it. */
  if (token) {
    localStorage.setItem(STORAGE_KEY, token);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// PUBLIC_INTERFACE
export function getStoredToken() {
  /** Reads the auth token from storage, if present. */
  return localStorage.getItem(STORAGE_KEY);
}

// PUBLIC_INTERFACE
export async function login(email, password) {
  /** Performs login against backend and returns { token, user }. */
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

// PUBLIC_INTERFACE
export async function register(name, email, password) {
  /** Registers a new user and returns { token, user }. */
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
}

// PUBLIC_INTERFACE
export async function fetchTodos() {
  /** Fetches all todos for the authenticated user. */
  const { data } = await api.get('/todos');
  return data;
}

// PUBLIC_INTERFACE
export async function createTodo(payload) {
  /** Creates a new todo task with payload: { title, description }. */
  const { data } = await api.post('/todos', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function updateTodo(id, payload) {
  /** Updates an existing todo by id with payload fields. */
  const { data } = await api.patch(`/todos/${id}`, payload);
  return data;
}

// PUBLIC_INTERFACE
export async function deleteTodo(id) {
  /** Deletes an existing todo by id. */
  const { data } = await api.delete(`/todos/${id}`);
  return data;
}
