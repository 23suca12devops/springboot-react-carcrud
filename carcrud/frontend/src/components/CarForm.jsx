import { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
        brand: editingCar.brand,
        model: editingCar.model,
        year: editingCar.year.toString(),
        engine: editingCar.engine,
        price: editingCar.price.toString(),
        resalePrice: editingCar.resalePrice.toString()
      });
    }
  }, [editingCar]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCar(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const carToSend = {
      brand: car.brand,
      model: car.model,
      year: Number.parseInt(car.year || 0, 10),
      engine: car.engine,
      price: Number.parseFloat(car.price || 0),
      resalePrice: Number.parseFloat(car.resalePrice || 0)
    };
    onSave(carToSend);
    setCar({ brand: "", model: "", year: "", engine: "", price: "", resalePrice: "" });
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input name="brand" placeholder="Brand" value={car.brand} onChange={handleChange} />
      <input name="model" placeholder="Model" value={car.model} onChange={handleChange} />
      <input name="year" placeholder="Year" value={car.year} onChange={handleChange} />
      <input name="engine" placeholder="Engine" value={car.engine} onChange={handleChange} />
      <input name="price" placeholder="Price" value={car.price} onChange={handleChange} />
      <input name="resalePrice" placeholder="Resale Price" value={car.resalePrice} onChange={handleChange} />
      <button type="submit">{editingCar ? "Update" : "Add"} Car</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }
};

CarForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  editingCar: PropTypes.object
};

export default CarForm;