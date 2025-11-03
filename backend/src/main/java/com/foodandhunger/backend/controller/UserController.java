package com.foodandhunger.backend.controller;

import com.foodandhunger.backend.dto.LoginRequest;
import com.foodandhunger.backend.models.User;
import com.foodandhunger.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User s) {
        String msg = userService.signup(s);
        return ResponseEntity.ok(msg);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        boolean success = userService.validateUser(request.getUsername(), request.getPassword());
        if (success) {
            return ResponseEntity.ok("login successful for user: " + request.getUsername());
        } else {
            return ResponseEntity.status(401).body("invalid credentials");
        }
    }

    @GetMapping("/")
    public ResponseEntity<String> hello(){
        String str = "Welcome to food and hunger";
        return ResponseEntity.ok(str);
    }
}
