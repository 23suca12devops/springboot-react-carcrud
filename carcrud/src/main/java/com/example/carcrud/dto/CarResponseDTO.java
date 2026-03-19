package com.example.carcrud.dto;

public class CarResponseDTO {

    private Long id;
    private String brand;
    private String model;
    private int year;
    private String engine;
    private Double price;
    private Double resalePrice;

    public CarResponseDTO() {}

    public CarResponseDTO(Long id, String brand, String model, int year, String engine, Double price, Double resalePrice) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.engine = engine;
        this.price = price;
        this.resalePrice = resalePrice;
    }

    // getters and setters
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