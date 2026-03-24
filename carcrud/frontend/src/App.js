import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import CarForm from "./components/CarForm";
import SignUp from "./components/SignUp";
import { getCars, addCar, updateCar, deleteCar } from "./services/carService";

function CarCrudPage({
  error,
  loading,
  cars,
  editingCar,
  onSave,
  onEdit,
  onDelete,
  onCancelEdit
}) {
  let carsContent = <p>Loading cars...</p>;

  if (!loading && cars.length === 0) {
    carsContent = <p>No cars found. Add one above!</p>;
  }

  if (!loading && cars.length > 0) {
    carsContent = (
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
                <button onClick={() => onEdit(car)} style={{ marginRight: "0.5rem" }}>✏️ Edit</button>
                <button onClick={() => onDelete(car.id)} style={{ color: "red" }}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🚗 Car CRUD App</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <CarForm
        onSave={onSave}
        editingCar={editingCar}
        onCancelEdit={onCancelEdit}
      />

      <h2>Car List ({cars.length})</h2>
      {carsContent}
    </div>
  );
}

CarCrudPage.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      brand: PropTypes.string,
      model: PropTypes.string,
      year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      engine: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      resalePrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ).isRequired,
  editingCar: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  onSave: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired
};

CarCrudPage.defaultProps = {
  error: null,
  editingCar: null
};

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
        const updated = await updateCar(editingCar.id, car);
        setCars((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setEditingCar(null);
      } else {
        const savedCar = await addCar(car);
        setCars((prev) => [...prev, savedCar]);
      }
    } catch (err) {
      console.error("Error saving car:", err);
      setError(err.message);
    }
  };

  const handleEdit = (car) => setEditingCar(car);
  const handleCancelEdit = () => setEditingCar(null);

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
    <Router>
      <div style={{ padding: "1rem" }}>
        <nav style={{ marginBottom: "1rem" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Cars</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={(
              <CarCrudPage
                error={error}
                loading={loading}
                cars={cars}
                editingCar={editingCar}
                onSave={handleSave}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCancelEdit={handleCancelEdit}
              />
            )}
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;