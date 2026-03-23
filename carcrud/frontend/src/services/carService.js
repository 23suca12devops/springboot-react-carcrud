// carService.js
const BASE_URL =
  process.env.REACT_APP_API_URL ||
  process.env.REACT_APP_FALLBACK_API_URL ||
  "http://localhost:8080/api/cars";

console.log("API Base URL:", BASE_URL);

// Fetch all cars
export async function getCars() {
  console.log("Fetching cars from:", BASE_URL);
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Fetch failed with status: " + res.status);
  const data = await res.json();
  return data.map(normalizeCar);
}

// Add a car
export async function addCar(car) {
  console.log("Adding car to:", BASE_URL);
  const payload = {
    brand: car.brand,
    model: car.model,
    year: car.year,
    engine: car.engine,
    price: car.price,
    resalePrice: car.resalePrice
  };
  console.log("POST payload:", payload);

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Add failed with status: " + res.status);
  const saved = await res.json();
  return normalizeCar(saved);
}

// Update a car
export async function updateCar(id, car) {
  const payload = {
    brand: car.brand,
    model: car.model,
    year: car.year,
    engine: car.engine,
    price: car.price,
    resalePrice: car.resalePrice
  };
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Update failed with status: " + res.status);
  const updated = await res.json();
  return normalizeCar(updated);
}

// Delete a car
export async function deleteCar(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed with status: " + res.status);
  return true;
}

// Normalize car object
export function normalizeCar(car) {
  return {
    id: car.id,
    brand: car.brand ?? "",
    model: car.model ?? "",
    year: car.year ?? "",
    engine: car.engine ?? "",
    price: car.price ?? 0,
    resalePrice: car.resalePrice ?? 0
  };
}