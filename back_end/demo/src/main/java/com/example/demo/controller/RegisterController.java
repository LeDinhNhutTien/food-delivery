package com.example.demo.controller;

import com.example.demo.modal.Customer;
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
    public ResponseEntity<?> register(@RequestBody @Valid Customer customer,
                                      BindingResult bindingResult){
         if (bindingResult.hasErrors()){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Đăng kí không thành công");
         }
         if (customerService.addCustomer(customer) == true) {
            return ResponseEntity.status(HttpStatus.OK).body("Đăng kí tài khoản thành công");

        } else {
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
