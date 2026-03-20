import { useEffect, useState } from "react";
import CarForm from "./components/CarForm";
import CarList from "./components/CarList";
import { getCars, deleteCar } from "./services/carService";

function App() {
    const [cars, setCars] = useState([]);

    async function loadCars() {
        const data = await getCars();
        setCars(data);
    }

    useEffect(() => {
        loadCars();
    }, []);

    function handleSave(car) {
        setCars(prev => {
            // Update if ID exists, otherwise add new car
            if (car.id) {
                return prev.map(c => c.id === car.id ? { ...c, ...car } : c);
            } else {
                return [...prev, car];
            }
        });
    }

    async function handleDelete(id) {
        try {
            await deleteCar(id); // don’t call .json()
            setCars(prev => prev.filter(c => c.id !== id));
        } catch(e) {
            console.error("Delete failed:", e);
        }
    }

    return (
        <div>
            <h2>Car Manager</h2>
            <CarForm onSave={handleSave} />
            <CarList cars={cars} onDelete={handleDelete} onUpdate={handleSave} />
        </div>
    );
}

export default App;
