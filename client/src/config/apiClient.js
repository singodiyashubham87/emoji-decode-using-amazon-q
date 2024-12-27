const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET", headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) throw new Error(`GET ${endpoint} failed with status ${response.status}`);
    return response.json();
  },

  post: async (endpoint, body) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true", },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`POST ${endpoint} failed with status ${response.status}`);
    return response.json();
  },
};
