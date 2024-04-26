package com.example.demo.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Dao.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {
    CustomerDao dao = new CustomerDao();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if(username.isEmpty() &&  password.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Thông tin người dùng và mật khẩu không được để trống");
        }
        if (username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Thông tin người dùng không được để trống");
        }
        if(password.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu không được để trống");
        }
        else if (dao.sign(username, password) == true) {
            return ResponseEntity.status(HttpStatus.OK).body("Đăng kí tài khoản thành công");

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Đăng kí không thành công");
        }
    }

}
