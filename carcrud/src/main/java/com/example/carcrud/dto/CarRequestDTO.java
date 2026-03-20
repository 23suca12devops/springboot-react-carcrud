package com.example.carcrud.dto;

public class CarRequestDTO {

    private String brand;
    private String model;
    private Integer year;          
    private String engine;
    private Double price;          
    private Double resalePrice;    

    public CarRequestDTO() {}

    public CarRequestDTO(String brand, String model, Integer year, String engine, Double price, Double resalePrice) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.engine = engine;
        this.price = price;
        this.resalePrice = resalePrice;
    }

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