const API_URL = "http://localhost:8080/api/cars";

export async function getCars() {
    const res = await fetch(API_URL);
    return res.json();
}

export async function getCar(id) {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
}

export async function addCar(car) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
    });
    return res.json();
}

export async function updateCar(id, car) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
    });
    return res.json();
}

export async function deleteCar(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
