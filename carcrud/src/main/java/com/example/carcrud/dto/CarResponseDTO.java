package com.example.carcrud.dto;

public class CarResponseDTO {
    private Long id;
    private String brand;
    private String model;
    private int year;
    private String engine;
    private double price;
    private double resalePrice;

    public CarResponseDTO() {}

    public CarResponseDTO(Long id, String brand, String model, int year, String engine, double price, double resalePrice) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.engine = engine;
        this.price = price;
        this.resalePrice = resalePrice;
    }

    // Getters only (optional)
    public Long getId() { return id; }
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public int getYear() { return year; }
    public String getEngine() { return engine; }
    public double getPrice() { return price; }
    public double getResalePrice() { return resalePrice; }
}