package com.example.carcrud.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
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

    // POST a new car
    @PostMapping
    public CarResponseDTO addCar(@RequestBody CarRequestDTO dto) {
        System.out.println("Received DTO: " + dto.getBrand() + ", price=" + dto.getPrice() + ", resale=" + dto.getResalePrice());
        Car car = new Car(
            dto.getBrand(),
            dto.getModel(),
            dto.getYear(),
            dto.getEngine(),
            dto.getPrice(),
            dto.getResalePrice()
        );
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
    public void deleteCar(@PathVariable Long id) {
        service.delete(id);
    }
}