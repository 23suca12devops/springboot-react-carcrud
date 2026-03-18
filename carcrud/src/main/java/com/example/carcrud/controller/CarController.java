package com.example.carcrud.controller; //C:\Users\nishu\Downloads\car-crud-project\carcrud\src\main\java\com\example\carcrud\controller

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.carcrud.model.Car;
import com.example.carcrud.service.CarService;


@CrossOrigin(origins = {
    "*"
})

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService service;
    public CarController(CarService service) {
        this.service = service;
    }

    @GetMapping
    public List<Car> getCars() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Car getCar(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Car addCar(@RequestBody Car car) {
        return service.save(car);
    }

    @PutMapping("/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car car) {
        return service.update(id, car);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        service.delete(id);
    }
}