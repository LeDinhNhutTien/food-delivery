package com.example.demo.controller;

import com.example.demo.dao.CustomerDao;
import com.example.demo.modal.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {
    CustomerDao dao = new CustomerDao();

    @PostMapping("/accountUpdate")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String firstName = credentials.get("firstName");
        String lastName = credentials.get("lastName");
        String phone = credentials.get("phone");
        String address = credentials.get("address");

         if (dao.updateAccount(username, firstName, lastName, phone, address)) {
             Customer c = new Customer(username, "", firstName, lastName, phone, address);
            return ResponseEntity.ok(c);

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cập nhật không thành công");
        }
    }

}
