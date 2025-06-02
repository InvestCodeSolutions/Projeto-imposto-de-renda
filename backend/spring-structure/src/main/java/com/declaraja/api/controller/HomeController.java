package com.declaraja.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> home() {
        Map<String, String> response = Map.of(
                "message", "DeclaraJá API - Spring Boot Structure",
                "description", "This Node.js app demonstrates the structure of the Spring Boot API to be implemented",
                "version", "1.0.0"
        );

        return ResponseEntity.ok(response);
    }
}
