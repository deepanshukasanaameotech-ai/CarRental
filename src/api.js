// api.js
// Centralized API service with base URL, auth token handling, and all endpoints

const BASE_URL = "https://autorentx.onrender.com"; // Backend URL

// Helper: Get stored JWT
const getToken = () => localStorage.getItem("token");

// Helper: Generic request wrapper
async function apiRequest(path, method = "GET", body = null, isFormData = false) {
  const headers = {};

  if (!isFormData) headers["Content-Type"] = "application/json";

  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : null,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const error = new Error(data?.message || data?.error || "API error");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data ?? {};
}

const unwrapData = (payload) => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }
  return payload;
};

// =============================
// AUTH APIs
// =============================
export const registerUser = (formData) => {
  return apiRequest("/register", "POST", formData, true);
};

export const loginUser = (body) => {
  return apiRequest("/login", "POST", body);
};

// =============================
// CARS APIs
// =============================
export const createCar = (formData) => apiRequest("/cars", "POST", formData, true);
export const getCars = async () => unwrapData(await apiRequest("/cars", "GET"));
export const getCarById = async (id) => unwrapData(await apiRequest(`/cars/${id}`, "GET"));
export const updateCar = (id, body) => apiRequest(`/cars/${id}`, "PUT", body);
export const deleteCar = (id) => apiRequest(`/cars/${id}`, "DELETE");

// =============================
// BOOKING APIs
// =============================
export const createBooking = (body) => apiRequest("/bookings", "POST", body);
export const getBookings = async () => unwrapData(await apiRequest("/bookings", "GET"));
export const getBookingsByUser = async (userId) => {
  try {
    return unwrapData(await apiRequest(`/bookings/${userId}`, "GET"));
  } catch (error) {
    if (error.status === 404) {
      return [];
    }

    if (error.status === 400) {
      try {
        return unwrapData(await apiRequest(`/bookings/${userId}`, "GET"));
      } catch (legacyError) {
        if (legacyError.status === 404) return [];
        throw legacyError;
      }
    }
    throw error;
  }
};
export const updateBooking = (id, body) => apiRequest(`/bookings/${id}`, "PUT", body);

export const deleteBooking = (id) => apiRequest(`/bookings/${id}`, "DELETE");

export const approveCancelRequest = (id, action) => {
  const params = new URLSearchParams({ action });
  return apiRequest(`/approve/${id}?${params.toString()}`, "PATCH");
};

// =============================
// EXPORT BASE_URL
// =============================
export { BASE_URL };
