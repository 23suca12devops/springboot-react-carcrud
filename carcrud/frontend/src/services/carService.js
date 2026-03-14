// base URL only, no /api/cars
const PRIMARY_API = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Utility function to fetch with fallback
async function fetchWithFallback(url, options = {}) {
  try {
    const res = await fetch(url, options);

    // handle non-200 responses
    if (!res.ok) {
      const text = await res.text();  // capture raw text for debugging
      console.error("Non-OK response from backend:", url, text);
      throw new Error(`Request failed: ${res.status}`);
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error("Backend returned invalid JSON:", text);
      throw new Error("Backend did not return valid JSON");
    }
  } catch (err) {
    if (url !== FALLBACK_API) {
      console.warn("Primary API failed, trying fallback API");
      return fetchWithFallback(FALLBACK_API, options);
    } else {
      throw err;
    }
  }
}

// API functions
export async function getCars() {
  return fetchWithFallback(`${PRIMARY_API}/api/cars`);
}

export async function getCar(id) {
  return fetchWithFallback(`${PRIMARY_API}/${id}`);
}

export async function addCar(car) {
  return fetchWithFallback(PRIMARY_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
}

export async function updateCar(id, car) {
  return fetchWithFallback(`${PRIMARY_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
}

export async function deleteCar(id) {
  return fetchWithFallback(`${PRIMARY_API}/${id}`, {
    method: "DELETE",
  });
}