const API = "https://carcrud-fge8hdgyfkbufcg5.centralindia-01.azurewebsites.net/api/cars";

async function fetchApi(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    // Return empty object for 204 No Content responses
    if (res.status === 204) return {};
    return res.json();
  } catch(e) {
    console.error("API fetch failed:", e);
    throw e;
  }
}

export async function getCars() {
  return fetchApi(API);
}

export async function getCar(id) {
  return fetchApi(`${API}/${id}`);
}

export async function addCar(car) {
  return fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
}

export async function updateCar(id, car) {
  return fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
}

export async function deleteCar(id) {
  return await fetchApi(`${API}/${id}`, { method: "DELETE" });
}