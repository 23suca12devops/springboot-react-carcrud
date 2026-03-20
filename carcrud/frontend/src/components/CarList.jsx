import { useState } from "react";
import PropTypes from "prop-types";
import CarForm from "./CarForm";

function CarList({ cars, onDelete, onUpdate }) {
    const [editingCarId, setEditingCarId] = useState(null);
    console.log("Cars received in CarList:", cars);

    return (
        <ul>
            {cars.map(car => (
                <li key={car.id}>
                    {editingCarId === car.id ? (
                        <CarForm
                            editingCar={car}
                            onSave={(updatedCar) => {
                                onUpdate(updatedCar);
                                setEditingCarId(null); // now safe, no extra blank car
                            }}
                        />
                    ) : (
                        <>
                            {car.brand || "?"} {car.model || "?"}
                            ({car.year || "?"}, {car.engine || "?"})
                            - ${car.price ?? 0}
                            (Resale: ${car.resalePrice ?? 0})
                            <button onClick={() => setEditingCarId(car.id)} style={{ marginLeft: "0.5rem" }}>
                                Edit
                            </button>
                            <button onClick={() => onDelete(car.id)} style={{ marginLeft: "0.5rem" }}>
                                X
                            </button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}

CarList.propTypes = {
    cars: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        brand: PropTypes.string,
        model: PropTypes.string,
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        engine: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        resalePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default CarList;
