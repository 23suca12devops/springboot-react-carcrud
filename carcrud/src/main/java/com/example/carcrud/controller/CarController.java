package com.example.carcrud.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.example.carcrud.model.Car;
import com.example.carcrud.service.CarService;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService service;

    public CarController(CarService service) {
        this.service = service;
    }

    @GetMapping("/ping")
    public String ping() {
        return "PING OK";
    }

    @GetMapping("/ping-test")
    public String pingTest() {
        return "PING TEST OK";
    }

    // GET all cars
    @GetMapping
    public List<Car> getCars() {
        List<Car> cars = service.getAll();
        System.out.println("✅ getCars called - total cars: " + cars.size());
        return cars;
    }

    // POST a new car
    @PostMapping
    public Car addCar(@RequestBody Car car) {
        System.out.println("🔍 RECEIVED CAR: brand=" + car.getBrand()
                + ", engine=" + car.getEngine()
                + ", price=" + car.getPrice()
                + ", resalePrice=" + car.getResalePrice());

        Car saved = service.save(car);

        System.out.println("💾 SAVED CAR: id=" + saved.getId()
                + ", brand=" + saved.getBrand()
                + ", engine=" + saved.getEngine()
                + ", price=" + saved.getPrice()
                + ", resalePrice=" + saved.getResalePrice());

        return saved;
    }

    // PUT to update an existing car
    @PutMapping("/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car car) {
        Car existingCar = service.getById(id);
        if (existingCar == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found with ID: " + id);
        }

        existingCar.setBrand(car.getBrand());
        existingCar.setModel(car.getModel());
        existingCar.setYear(car.getYear());
        existingCar.setEngine(car.getEngine());
        existingCar.setPrice(car.getPrice());
        existingCar.setResalePrice(car.getResalePrice());

        return service.save(existingCar);
    }

    // DELETE a car
    @DeleteMapping("/{id}")
    public String deleteCar(@PathVariable Long id) {
        service.delete(id);
        return "Deleted successfully";
    }
}