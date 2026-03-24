package com.example.carcrud.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.carcrud.model.User;
import com.example.carcrud.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService service;
    public UserController(UserService service) { this.service = service; }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        if(service.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        service.save(user);
        return ResponseEntity.ok("Sign up successful");
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getUsers() {
        List<UserResponse> users = service.findAll().stream()
            .map(user -> new UserResponse(user.getId(), user.getName(), user.getEmail()))
            .toList();
        return ResponseEntity.ok(users);
    }

    public record UserResponse(Long id, String name, String email) {}
}