package com.example.demo.controller;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.modal.request.LoginRequest;
import com.example.demo.modal.response.AuthResponse;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    CustomerService customerService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse authResponse = customerService.login(request);
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/customer/{id}")
    public Optional<ResponseEntity<CustomerDTO>> getCustomerById(@PathVariable Long id) {
        Optional<CustomerDTO> customerOptional = Optional.ofNullable(customerService.getCustomerById(Math.toIntExact(id)));
        return customerOptional.map(customer -> new ResponseEntity<>(customer, HttpStatus.OK));

    }
}
