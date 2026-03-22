import React, { useState, useEffect } from "react";

export default function CarForm({ onSave, editingCar, onCancelEdit }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [price, setPrice] = useState("");
  const [resalePrice, setResalePrice] = useState("");

  // When editingCar changes, populate form fields
  useEffect(() => {
    if (editingCar) {
      setBrand(editingCar.brand || "");
      setModel(editingCar.model || "");
      setYear(editingCar.year || "");
      setEngine(editingCar.engine || "");
      setPrice(editingCar.price || "");
      setResalePrice(editingCar.resalePrice || "");
    } else {
      setBrand(""); setModel(""); setYear("");
      setEngine(""); setPrice(""); setResalePrice("");
    }
  }, [editingCar]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!brand || !model || !year) {
      alert("Please fill Brand, Model and Year");
      return;
    }

    const carData = {
      brand,
      model,
      year: parseInt(year),
      engine: engine || "",
      price: price ? parseFloat(price) : 0,
      resalePrice: resalePrice ? parseFloat(resalePrice) : 0
    };

    onSave(carData);

    setBrand(""); setModel(""); setYear("");
    setEngine(""); setPrice(""); setResalePrice("");
  };

  const isEditing = !!editingCar;

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>{isEditing ? "✏️ Edit Car" : "➕ Add Car"}</h3>
      <input placeholder="Brand" required value={brand} onChange={(e) => setBrand(e.target.value)} />
      <input placeholder="Model" required value={model} onChange={(e) => setModel(e.target.value)} />
      <input placeholder="Year" type="number" required value={year} onChange={(e) => setYear(e.target.value)} />
      <input placeholder="Engine" value={engine} onChange={(e) => setEngine(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Resale Price" type="number" value={resalePrice} onChange={(e) => setResalePrice(e.target.value)} />
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        {isEditing ? "Update Car" : "Add Car"}
      </button>
      {isEditing && (
        <button type="button" onClick={onCancelEdit} style={{ marginLeft: "0.5rem" }}>
          Cancel
        </button>
      )}
    </form>
  );
}