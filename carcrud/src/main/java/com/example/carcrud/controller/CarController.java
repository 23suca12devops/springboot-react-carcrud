package com.example.carcrud.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.example.carcrud.dto.CarRequestDTO;
import com.example.carcrud.dto.CarResponseDTO;
import com.example.carcrud.model.Car;
import com.example.carcrud.service.CarService;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService service;

    public CarController(CarService service) {
        this.service = service;
    }

    // Add a new car
    @PostMapping
    public CarResponseDTO addCar(@RequestBody CarRequestDTO dto) {
        Car car = new Car();
        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setYear(dto.getYear());
        car.setEngine(dto.getEngine());
        car.setPrice(dto.getPrice());
        car.setResalePrice(dto.getResalePrice());

        Car saved = service.save(car);

        return new CarResponseDTO(
            saved.getId(),
            saved.getBrand(),
            saved.getModel(),
            saved.getYear(),
            saved.getEngine(),
            saved.getPrice(),
            saved.getResalePrice()
        );
    }

    // Update an existing car
    @PutMapping("/{id}")
    public CarResponseDTO updateCar(@PathVariable Long id, @RequestBody CarRequestDTO dto) {
        Car car = new Car();
        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setYear(dto.getYear());
        car.setEngine(dto.getEngine());
        car.setPrice(dto.getPrice());
        car.setResalePrice(dto.getResalePrice());

        Car updated = service.update(id, car);

        return new CarResponseDTO(
            updated.getId(),
            updated.getBrand(),
            updated.getModel(),
            updated.getYear(),
            updated.getEngine(),
            updated.getPrice(),
            updated.getResalePrice()
        );
    }

    // Get all cars
    @GetMapping
    public List<CarResponseDTO> getCars() {
        return service.getAll().stream()
            .map(car -> new CarResponseDTO(
                car.getId(),
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                car.getEngine(),
                car.getPrice(),
                car.getResalePrice()
            ))
            .toList();
    }

    // Get a car by ID
    @GetMapping("/{id}")
    public CarResponseDTO getCar(@PathVariable Long id) {
        Car car = service.getById(id);
        return new CarResponseDTO(
            car.getId(),
            car.getBrand(),
            car.getModel(),
            car.getYear(),
            car.getEngine(),
            car.getPrice(),
            car.getResalePrice()
        );
    }

    // Delete a car by ID
    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        service.delete(id);
    }
}