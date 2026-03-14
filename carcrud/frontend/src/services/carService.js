const PRIMARY_API = process.env.REACT_APP_API_URL 
const FALLBACK_API = (process.env.REACT_APP_FALLBACK_API_URL || PRIMARY_API) 

async function fetchWithFallback(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Primary API failed");
    return await res.json();
  } catch (err) {
    if (url !== FALLBACK_API) {
      console.warn("Primary API failed, trying fallback API");
      const res = await fetch(FALLBACK_API, options);
      return await res.json();
    } else {
      throw err;
    }
  }
}

export async function getCars() {
  return fetchWithFallback(PRIMARY_API);
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
  await fetchWithFallback(`${PRIMARY_API}/${id}`, {
    method: "DELETE",
  });
}