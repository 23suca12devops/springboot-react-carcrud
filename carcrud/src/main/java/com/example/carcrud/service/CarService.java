package com.example.carcrud.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.carcrud.model.Car;
import com.example.carcrud.repository.CarRepository;

@Service
public class CarService {

    private final CarRepository repo;

    public CarService(CarRepository repo) {
        this.repo = repo;
    }

    public List<Car> getAll() {
        return repo.findAll();
    }

    public Car save(Car car) {
        return repo.save(car);
    }

    public Car update(Long id, Car car) {
        car.setId(id);
        return repo.save(car);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Car getById(Long id) {
        return repo.findById(id).orElse(null);
    }
}
