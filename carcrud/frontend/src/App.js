import React, { useEffect, useState } from "react";
import CarForm from "./components/CarForm";
import { getCars, addCar, updateCar, deleteCar } from "./services/carService";

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCar, setEditingCar] = useState(null);

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
      if (editingCar) {
        // UPDATE existing car
        const updated = await updateCar(editingCar.id, car);
        setCars((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setEditingCar(null);
      } else {
        // ADD new car
        const savedCar = await addCar(car);
        setCars((prev) => [...prev, savedCar]);
      }
    } catch (err) {
      console.error("Error saving car:", err);
      setError(err.message);
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
  };

  const handleCancelEdit = () => {
    setEditingCar(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      await deleteCar(id);
      setCars((prev) => prev.filter((car) => car.id !== id));
      if (editingCar && editingCar.id === id) setEditingCar(null);
    } catch (err) {
      console.error("Error deleting car:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🚗 Car CRUD App</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <CarForm
        onSave={handleSave}
        editingCar={editingCar}
        onCancelEdit={handleCancelEdit}
      />

      <h2>Car List ({cars.length})</h2>
      {loading ? (
        <p>Loading cars...</p>
      ) : cars.length === 0 ? (
        <p>No cars found. Add one above!</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead style={{ background: "#f0f0f0" }}>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Engine</th>
              <th>Price ($)</th>
              <th>Resale ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} style={{ background: editingCar?.id === car.id ? "#fff9c4" : "white" }}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.engine}</td>
                <td>{car.price}</td>
                <td>{car.resalePrice}</td>
                <td>
                  <button onClick={() => handleEdit(car)} style={{ marginRight: "0.5rem" }}>✏️ Edit</button>
                  <button onClick={() => handleDelete(car.id)} style={{ color: "red" }}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;