const API_URL = "http://localhost:3000";

const request = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  return res.json();
};

export const api = Object.assign(request, {
  get: (endpoint: string, options: RequestInit = {}) =>
    request(endpoint, { ...options, method: "GET" }),

  post: (endpoint: string, body: any, options: RequestInit = {}) =>
    request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  patch: (endpoint: string, body?: any, options: RequestInit = {}) =>
    request(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: (endpoint: string, options: RequestInit = {}) =>
    request(endpoint, { ...options, method: "DELETE" }),
});
