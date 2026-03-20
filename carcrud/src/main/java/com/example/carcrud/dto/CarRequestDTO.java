package com.example.carcrud.dto;

public class CarRequestDTO {

    private String brand;
    private String model;
    private int year;
    private String engine;
    private double price;
    private double resalePrice;

    // Getters & Setters
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getEngine() { return engine; }
    public void setEngine(String engine) { this.engine = engine; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getResalePrice() { return resalePrice; }
    public void setResalePrice(double resalePrice) { this.resalePrice = resalePrice; }
}