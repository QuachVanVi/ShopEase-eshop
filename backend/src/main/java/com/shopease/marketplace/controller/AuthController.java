package com.shopease.marketplace.controller;

import com.shopease.marketplace.dto.LoginRequest;
import com.shopease.marketplace.dto.LoginResponse;
import com.shopease.marketplace.entity.User;
import com.shopease.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Vibe Coding Baseline: simple compare
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                // In a real app we'd generate a JWT here. 
                // For this baseline we return a dummy token.
                return ResponseEntity.ok(new LoginResponse("dummy-jwt-token-for-" + user.getUsername(), user.getUsername()));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
