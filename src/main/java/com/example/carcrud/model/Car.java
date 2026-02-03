package com.example.carcrud.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;

    @Column(name = "model_year")
    private int year;

    private String engine;
    private double price;
    private double resalePrice;

    // constructors, getters, setters ...

    // Constructors
    public Car() {}

    public Car(String brand, String model, int year, String engine, double price, double resalePrice) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.engine = engine;
        this.price = price;
        this.resalePrice = resalePrice;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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
