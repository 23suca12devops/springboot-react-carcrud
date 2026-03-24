package com.example.carcrud.model;

import jakarta.persistence.*;

@Entity
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;

    @Column(name = "model_year")
    private Integer year;      

    private String engine;
    private Double price;
    
    @Column(name = "resale_price")
    private Double resalePrice;

    // Default constructor
    public Car() {}

     // Constructor for creating new car
    public Car(String brand, String model, Integer year, String engine, Double price, Double resalePrice) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.engine = engine;
        this.price = price;
        this.resalePrice = resalePrice;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public String getEngine() { return engine; }
    public void setEngine(String engine) { this.engine = engine; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getResalePrice() { return resalePrice; }
    public void setResalePrice(Double resalePrice) { this.resalePrice = resalePrice; }
}