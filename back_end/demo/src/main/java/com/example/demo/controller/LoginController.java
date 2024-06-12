package com.example.demo.controller;

import com.example.demo.dao.*;
import com.example.demo.service.LoginService;
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
    LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> register(@RequestBody @Valid Customer customer,
                                      BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }

        if (loginService.validateLogin(customer.getUsername(), customer.getPassword()) == true) {
            Customer c = loginService.getCustomerByUsername(customer.getUsername());
            return ResponseEntity.ok(c);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tên đăng nhập hoặc mật khẩu không đúng");
        }
    }

}
