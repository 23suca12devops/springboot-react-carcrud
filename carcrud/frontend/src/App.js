import React, { useEffect, useState } from "react";
import CarForm from "./components/CarForm";
import { getCars, addCar, deleteCar } from "./services/carService";

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCars = async () => {
    setLoading(true);
    try {
      const data = await getCars();
      setCars(data);
    } catch (err) {
      console.error("Error loading cars:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (car) => {
    try {
      const savedCar = await addCar(car);
      setCars((prev) => [...prev, savedCar]);
    } catch (err) {
      console.error("Error saving car:", err);
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch (err) {
      console.error("Error deleting car:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <div>
      <h1>Car CRUD App</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CarForm onSave={handleSave} />
      {loading ? (
        <p>Loading cars...</p>
      ) : (
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              {car.brand} {car.model} ({car.year}) - Engine: {car.engine} | Price: ${car.price} | Resale: ${car.resalePrice}
              <button onClick={() => handleDelete(car.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;