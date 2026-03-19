package com.example.carcrud.dto;

public class CarDTO {
    private Long id;
    private String model;
    private String brand;
    private int year; // example field, include only what you want exposed

    public CarDTO() {}

    public CarDTO(Long id, String model, String brand, int year) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.year = year;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
}