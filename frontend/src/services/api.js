// src/services/api.js

// axios: HTTPクライアントとして、DjangoのAPIと通信するために使用
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
});

export const getProjects = () => api.get('projects/');
export const getProject = (id) => api.get(`projects/${id}/`);
export const createProject = (data) => api.post('projects/', data);
export const updateProject = (id, data) => api.put(`projects/${id}/`, data);
export const deleteProject = (id) => api.delete(`projects/${id}/`);

export const getTasks = () => api.get('tasks/');
export const getTask = (id) => api.get(`tasks/${id}/`);
export const createTask = (data) => api.post('tasks/', data);
export const updateTask = (id, data) => api.put(`tasks/${id}/`, data);
export const deleteTask = (id) => api.delete(`tasks/${id}/`);