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
public class ChangePasswordController {
    CustomerDao dao = new CustomerDao();

    MD5Utils utils = new MD5Utils();

    @Autowired
    CustomerService service;

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String oldPass = utils.encrypt(credentials.get("oldPass"));
        String newPass = utils.encrypt(credentials.get("newPass"));

        if(oldPass.isEmpty() || oldPass == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu cũ không được để trống");
        }
        if (newPass.isEmpty() || newPass == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu mới không được để trống");
        }
        if(!service.checkPass(username, oldPass)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu cũ không chính xác");
        }
        else if (service.checkPass(username, oldPass)) {
            service.updatePassword(username, newPass);
            return ResponseEntity.status(HttpStatus.OK).body("Đổi mật khẩu thành công");

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Đổi mật khẩu không thành công");
        }
    }
}
