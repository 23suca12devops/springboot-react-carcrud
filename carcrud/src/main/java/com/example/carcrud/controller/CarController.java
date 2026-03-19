package com.example.carcrud.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
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

    // GET all cars
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

    // GET a single car by ID
    @GetMapping("/{id}")
    public CarResponseDTO getCar(@PathVariable Long id) {
        Car car = service.getById(id);
        if (car == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found with ID: " + id);
        }
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

    // POST a new car
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

    // PUT to update an existing car
    @PutMapping("/{id}")
    public CarResponseDTO updateCar(@PathVariable Long id, @RequestBody CarRequestDTO dto) {
        Car existingCar = service.getById(id);
        if (existingCar == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found with ID: " + id);
        }
    
        existingCar.setBrand(dto.getBrand());
        existingCar.setModel(dto.getModel());
        existingCar.setYear(dto.getYear());
        existingCar.setEngine(dto.getEngine());
        existingCar.setPrice(dto.getPrice());
        existingCar.setResalePrice(dto.getResalePrice());
    
        Car updated = service.save(existingCar);
    
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

    // DELETE a car
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}