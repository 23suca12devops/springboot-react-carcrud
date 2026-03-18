const API = "/api/cars";

async function fetchApi(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export async function getCars() {
  return fetchApi(API);
}

export async function getCar(id) {
  return fetchApi(`${API}/${id}`);
}

export async function addCar(car) {
  return fetchApi(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
}

export async function updateCar(id, car) {
  return fetchApi(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
}

export async function deleteCar(id) {
  await fetchApi(`${API}/${id}`, { method: "DELETE" });
}