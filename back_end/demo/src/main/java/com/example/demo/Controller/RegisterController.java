package com.example.demo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.example.demo.utils.MD5Utils;
import com.example.demo.Dao.CustomerDao;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class RegisterController {
    CustomerDao dao = new CustomerDao();


    @PostMapping("/register")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        if(username.isEmpty() &&  password.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Thông tin người dùng  và mật khẩu k đc để trống");
        }
        if (username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Thông tin người dùng k đc để trống");
        }
        if(password.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu k đc để trống");
        }
        if (dao.sign(username, password) == true) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Đăng kí  tài khoản thành công");

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Đăng kí không thành công");
        }
    }


}
