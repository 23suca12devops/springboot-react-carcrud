import { useState, useEffect } from "react";
import { addCar, updateCar } from "../services/carService";

function CarForm({ onSave, editingCar }) {
    const [car, setCar] = useState({
        brand: "",
        model: "",
        year: "",
        engine: "",
        price: "",
        resalePrice: ""
    });

    useEffect(() => {
        if (editingCar) {
            setCar({
                brand: editingCar.brand ?? "",
                model: editingCar.model ?? "",
                year: editingCar.year ?? "",
                engine: editingCar.engine ?? "",
                price: editingCar.price ?? "",
                resalePrice: editingCar.resalePrice ?? ""
            });
        }
    }, [editingCar]);

    async function submit(e) {
        e.preventDefault();

        const carToSend = {
            ...car,
            year: parseInt(car.year),
            price: parseFloat(car.price),
            resalePrice: parseFloat(car.resalePrice)
        };

        let savedCar;
        if (editingCar) {
            savedCar = await updateCar(editingCar.id, carToSend);
        } else {
            savedCar = await addCar(carToSend);
        }

        onSave(savedCar);
        setCar({ brand: "", model: "", year: "", engine: "", price: "", resalePrice: "" });
    }

    return (
        <form onSubmit={submit} style={{ marginBottom: "1rem" }}>
            <input placeholder="Brand" value={car.brand} onChange={e => setCar({...car, brand: e.target.value})} />
            <input placeholder="Model" value={car.model} onChange={e => setCar({...car, model: e.target.value})} />
            <input placeholder="Year" value={car.year} onChange={e => setCar({...car, year: e.target.value})} />
            <input placeholder="Engine" value={car.engine} onChange={e => setCar({...car, engine: e.target.value})} />
            <input placeholder="Price" value={car.price} onChange={e => setCar({...car, price: e.target.value})} />
            <input placeholder="Resale Price" value={car.resalePrice} onChange={e => setCar({...car, resalePrice: e.target.value})} />
            <button type="submit">{editingCar ? "Update" : "Add"} Car</button>
        </form>
    );
}

export default CarForm;
