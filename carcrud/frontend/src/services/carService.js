const PRIMARY_API = '/api'; // points to your Vercel proxy
const PRIMARY_API = process.env.REACT_APP_API_URL;

async function fetchApi(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export async function getCars() {
  return fetchApi(`${PRIMARY_API}/api/cars`);
}

export async function getCar(id) {
  return fetchApi(`${PRIMARY_API}/api/cars/${id}`);
}

export async function addCar(car) {
  return fetchApi(`${PRIMARY_API}/api/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
}

export async function updateCar(id, car) {
  return fetchApi(`${PRIMARY_API}/api/cars/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
}

export async function deleteCar(id) {
  await fetchApi(`${PRIMARY_API}/api/cars/${id}`, { method: "DELETE" });
}