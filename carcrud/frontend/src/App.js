import { useEffect, useState } from "react";
import CarForm from "./components/CarForm";
import CarList from "./components/CarList";
import { getCars, addCar, deleteCar } from "./services/carService"; // <-- no normalizeCar here

function App() {
  const [cars, setCars] = useState([]);

  // Load cars from backend
  async function loadCars() {
    try {
      const data = await getCars(); // already normalized
      setCars(data);
    } catch (err) {
      console.error("Error loading cars:", err);
    }
  }

  useEffect(() => {
    loadCars();
  }, []);

  // Add new car
  async function handleSave(car) {
    try {
      const saved = await addCar(car); // already normalized
      console.log("Saved from backend:", saved);
      setCars(prev => [...prev, saved]);
    } catch (err) {
      console.error("Error saving car:", err);
    }
  }

  // Delete car
  async function handleDelete(id) {
    try {
      await deleteCar(id);
      setCars(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚗 Car Manager</h1>

      <CarForm onSave={handleSave} />

      <CarList
        cars={cars}
        onDelete={handleDelete}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "#f5f5f5",
    minHeight: "100vh"
  },
  title: {
    marginBottom: "20px"
  }
};

export default App;