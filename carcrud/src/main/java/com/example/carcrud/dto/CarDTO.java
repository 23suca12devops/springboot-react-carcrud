package com.example.carcrud.dto;

public class CarDTO {
    private Long id;
    private String model;
    private String brand;
    private int year;
    private String engine;
    private double price;
    private double resalePrice;

    public CarDTO() {}

    public CarDTO(Long id, String model, String brand, int year,
                  String engine, double price, double resalePrice) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.year = year;
        this.engine = engine;
        this.price = price;
        this.resalePrice = resalePrice;
    }

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getEngine() { return engine; }
    public void setEngine(String engine) { this.engine = engine; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getResalePrice() { return resalePrice; }
    public void setResalePrice(double resalePrice) { this.resalePrice = resalePrice; }
}