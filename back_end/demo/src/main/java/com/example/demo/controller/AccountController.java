package com.example.demo.controller;

import com.example.demo.modal.*;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    CustomerService service;

    @PostMapping("/accountUpdate")
    public ResponseEntity<?> changePassword(@RequestBody Customer customer) {
        try {
                // Lấy thông tin người dùng cũ từ cơ sở dữ liệu
                Customer existingCustomer = service.getCustomerById(customer.getId_user());

                // Cập nhật thông tin từ người dùng mới
                existingCustomer.setFirst_name(customer.getFirst_name());
                existingCustomer.setLast_name(customer.getLast_name());
                existingCustomer.setPhone(customer.getPhone());
                existingCustomer.setAddress(customer.getAddress());

            // Lưu thông tin cập nhật vào cơ sở dữ liệu
            Customer savedCustomer = service.save(existingCustomer);

            if (savedCustomer != null) {
                return ResponseEntity.ok(savedCustomer);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cập nhật không thành công");
            }
        }
         catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi cập nhật thông tin tài khoản.");
        }
    }
}
