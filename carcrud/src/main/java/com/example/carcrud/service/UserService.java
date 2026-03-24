package com.example.carcrud.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.example.carcrud.model.User;
import com.example.carcrud.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) { this.repo = repo; }

    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }

    public User save(User user) {
        return repo.save(user);
    }

    public List<User> findAll() {
        return repo.findAll();
    }
}