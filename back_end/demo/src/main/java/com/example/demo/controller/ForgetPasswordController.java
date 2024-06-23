package com.example.demo.controller;

import com.example.demo.service.CustomerDao;
import com.example.demo.service.CustomerService;
import com.example.demo.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ForgetPasswordController {
    MD5Utils utils = new MD5Utils();
    @Autowired
    CustomerService service;

    @PostMapping("/forgetPassword")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String newPass = credentials.get("newPass");
        String confirmPassword = credentials.get("confirmPassword");


        if (newPass.isEmpty() || newPass == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu mới không được để trống");
        }
        if(confirmPassword.isEmpty() || confirmPassword == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Xác nhận không được để trống");
        }
        else if (service.updatePassword(username, utils.encrypt(newPass))) {
            return ResponseEntity.status(HttpStatus.OK).body("Cấp lại mật khẩu thành công");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cấp lại mật khẩu không thành công");
        }
    }
}