import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authApi = {
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Problems API
export const problemsApi = {
  getAll: async () => {
    const response = await api.get('/problems');
    return response.data;
  },

  getById: async (problemId: number) => {
    const response = await api.get(`/problems/${problemId}`);
    return response.data;
  },

  runCode: async (code: string, language: string) => {
    const response = await api.post('/problems/run', { code, language });
    return response.data;
  },
};

// Discussion API
export const discussionApi = {
  getAllPosts: async () => {
    const response = await api.get('/discussion/posts');
    return response.data;
  },

  getPost: async (postId: number) => {
    const response = await api.get(`/discussion/posts/${postId}`);
    return response.data;
  },

  createPost: async (title: string, content: string) => {
    const response = await api.post('/discussion/posts', { title, content });
    return response.data;
  },

  deletePost: async (postId: number) => {
    const response = await api.delete(`/discussion/posts/${postId}`);
    return response.data;
  },

  getFavoritePosts: async () => {
    const response = await api.get('/discussion/posts/favorites');
    return response.data;
  },

  addFavorite: async (postId: number) => {
    const response = await api.post(`/discussion/posts/${postId}/favorite`);
    return response.data;
  },

  removeFavorite: async (postId: number) => {
    const response = await api.delete(`/discussion/posts/${postId}/favorite`);
    return response.data;
  },

  getComments: async (postId: number) => {
    const response = await api.get(`/discussion/posts/${postId}/comments`);
    return response.data;
  },

  addComment: async (postId: number, content: string) => {
    const response = await api.post(`/discussion/posts/${postId}/comments`, { content });
    return response.data;
  },

  deleteComment: async (commentId: number) => {
    const response = await api.delete(`/discussion/comments/${commentId}`);
    return response.data;
  },
};

export default api;

