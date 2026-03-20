// src/services/carService.js

// Hardcoded endpoints
const LOCAL_API = "http://localhost:8080/api/cars";
const AZURE_API = "https://carcrud-fge8hdgyfkbufcg5.centralindia-01.azurewebsites.net/api/cars";

// Current active API, can switch dynamically
let API_BASE = LOCAL_API; // default to local

// Optional helper to switch endpoints dynamically
export function useBackend(backend = "local") {
  if (backend === "azure") {
    API_BASE = AZURE_API;
  } else {
    API_BASE = LOCAL_API;
  }
  console.log("Switched API Base URL to:", API_BASE);
}

// Fetch cars
export async function getCars() {
  console.log("Fetching cars from:", API_BASE);
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error(`Fetch failed with status: ${res.status}`);
  const data = await res.json();
  return data.map(normalizeCar);
}

// Add a car
export async function addCar(car) {
  console.log("Adding car to:", API_BASE);
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car)
  });
  if (!res.ok) throw new Error(`Add failed with status: ${res.status}`);
  const saved = await res.json();
  return normalizeCar(saved);
}

// Delete a car
export async function deleteCar(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Delete failed with status: ${res.status}`);
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