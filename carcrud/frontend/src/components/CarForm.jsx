import React, { useState } from "react";

export default function CarForm({ onSave }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [price, setPrice] = useState("");
  const [resalePrice, setResalePrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare full payload
    const carData = {
      brand: brand || "",
      model: model || "",
      year: parseInt(year) || 0,
      engine: engine || "",
      price: parseFloat(price) || 0,
      resalePrice: parseFloat(resalePrice) || 0
    };

    onSave(carData);

    // Reset form
    setBrand("");
    setModel("");
    setYear("");
    setEngine("");
    setPrice("");
    setResalePrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
      <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
      <input placeholder="Year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      <input placeholder="Engine" value={engine} onChange={(e) => setEngine(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Resale Price" type="number" value={resalePrice} onChange={(e) => setResalePrice(e.target.value)} />
      <button type="submit">Add Car</button>
    </form>
  );
}