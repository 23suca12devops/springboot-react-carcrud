package com.example.carcrud.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carcrud.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}