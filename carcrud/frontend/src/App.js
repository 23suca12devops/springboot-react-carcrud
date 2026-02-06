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
            const exists = prev.find(c => c.id === car.id);
            if (exists) {
                return prev.map(c => c.id === car.id ? car : c);
            } else {
                return [...prev, car];
            }
        });
    }

    async function handleDelete(id) {
        await deleteCar(id);
        setCars(prev => prev.filter(c => c.id !== id));
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
