package com.example.demo.controller;

import com.example.demo.modal.Customer;
import com.example.demo.modal.request.RegisterRequest;
import com.example.demo.modal.response.AuthResponse;
import com.example.demo.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {
    @Autowired
    CustomerService customerService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request,
                                      BindingResult bindingResult){
        try {
            if (bindingResult.hasErrors()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Đăng kí không thành công");
            }
            AuthResponse authResponse = customerService.addCustomer(request);

            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Đăng kí không thành công");
        }
    }

    @GetMapping("/checkUsername/{username}")
    public ResponseEntity<String> checkUsernameExists(@PathVariable String username) {
        if (customerService.checkUsername(username) == true) {
            return ResponseEntity.status(HttpStatus.OK).body("Tài khoản đã tồn tại");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tài khoản chưa tồn tại");
        }
    }
}
