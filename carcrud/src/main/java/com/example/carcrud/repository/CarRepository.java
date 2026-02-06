package com.example.carcrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carcrud.model.Car;

public interface CarRepository extends JpaRepository<Car, Long> {}
