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
  
    console.log("SENDING:", carData);
  
    onSave(carData);
  
    setBrand("");
    setModel("");
    setYear("");
    setEngine("");
    setPrice("");
    setResalePrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Brand" required value={brand} onChange={(e) => setBrand(e.target.value)} />
      <input placeholder="Model" required value={model} onChange={(e) => setModel(e.target.value)} />
      <input placeholder="Year" type="number" required value={year} onChange={(e) => setYear(e.target.value)} />
      <input placeholder="Engine" value={engine} onChange={(e) => setEngine(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Resale Price" type="number" value={resalePrice} onChange={(e) => setResalePrice(e.target.value)} />
      <button type="submit">Add Car</button>
    </form>
  );
}