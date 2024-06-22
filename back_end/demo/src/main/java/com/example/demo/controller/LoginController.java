package com.example.demo.controller;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.modal.request.LoginRequest;
import com.example.demo.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.example.demo.modal.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
    @Autowired
    CustomerService customerService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        CustomerDTO customerDTO = customerService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (customerDTO != null) {
            return new ResponseEntity<>(customerDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }

    }

}
