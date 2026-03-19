package com.example.carcrud.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.example.carcrud.dto.CarDTO;
import com.example.carcrud.model.Car;
import com.example.carcrud.service.CarService;

@CrossOrigin(origins = {
        "https://delightful-water-07fdd0c00.1.azurestaticapps.net",
        "http://localhost:3000"
})
@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService service;

    public CarController(CarService service) {
        this.service = service;
    }

    // Convert entity list to DTO list using Stream.toList()
    @GetMapping
    public List<CarDTO> getCars() {
        return service.getAll()
                .stream()
                .map(car -> new CarDTO(car.getId(), car.getModel(), car.getBrand(), car.getYear()))
                .toList(); // <- replaced collect(Collectors.toList()) with toList()
    }

    @GetMapping("/{id}")
    public CarDTO getCar(@PathVariable Long id) {
        Car car = service.getById(id);
        return new CarDTO(car.getId(), car.getModel(), car.getBrand(), car.getYear());
    }

    @PostMapping
    public CarDTO addCar(@RequestBody CarDTO dto) {
        Car car = new Car();
        car.setModel(dto.getModel());
        car.setBrand(dto.getBrand());
        car.setYear(dto.getYear());
        Car saved = service.save(car);
        return new CarDTO(saved.getId(), saved.getModel(), saved.getBrand(), saved.getYear());
    }

    @PutMapping("/{id}")
    public CarDTO updateCar(@PathVariable Long id, @RequestBody CarDTO dto) {
        Car car = new Car();
        car.setModel(dto.getModel());
        car.setBrand(dto.getBrand());
        car.setYear(dto.getYear());
        Car updated = service.update(id, car);
        return new CarDTO(updated.getId(), updated.getModel(), updated.getBrand(), updated.getYear());
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        service.delete(id);
    }
}