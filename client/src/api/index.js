const API_BASE = '/api';

async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message);
  }
  return res.json();
}

export const api = {
  students: {
    list: (params) => fetchAPI(`/students?${new URLSearchParams(params)}`),
    get: (id) => fetchAPI(`/students/${id}`),
  },
  faculty: {
    list: (params) => fetchAPI(`/faculty?${new URLSearchParams(params)}`),
  },
  events: {
    list: (params) => fetchAPI(`/events?${new URLSearchParams(params)}`),
  },
  governance: {
    leaders: (params) => fetchAPI(`/governance/leaders?${new URLSearchParams(params)}`),
    toppers: () => fetchAPI('/governance/toppers'),
  },
  clubs: {
    list: () => fetchAPI('/clubs'),
    get: (id) => fetchAPI(`/clubs/${id}`),
  },
  titles: {
    list: () => fetchAPI('/titles'),
    student: (id) => fetchAPI(`/titles/student/${id}`),
  },
  leaderboard: {
    get: (category) => fetchAPI(`/leaderboard/${category}`),
  },
  messages: {
    conversations: (studentId) => fetchAPI(`/messages/conversations/${studentId}`),
    rooms: () => fetchAPI('/messages/rooms'),
  },
  books: {
    list: (params) => fetchAPI(`/books?${new URLSearchParams(params)}`),
  },
  suggestions: {
    list: (params) => fetchAPI(`/suggestions?${new URLSearchParams(params)}`),
  },
};

export default api;
