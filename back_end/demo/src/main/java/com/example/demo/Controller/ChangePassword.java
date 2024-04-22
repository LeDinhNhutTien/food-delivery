package com.example.demo.Controller;

import com.example.demo.Dao.CustomerDao;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ChangePassword {
    CustomerDao dao = new CustomerDao();
    @PostMapping("/changePassword")
    public ResponseEntity<?> register(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String oldPass = credentials.get("oldPass");
        String newPass = credentials.get("newPass");

        if(username.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tên đăng nhập không được để trống");
        }
        if(oldPass.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu cũ không được để trống");
        }
        if (newPass.isEmpty() || newPass == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu mới không được để trống");
        }
        if(!dao.checkPass(username, oldPass)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu cũ không chính xác");
        }
        else if (dao.checkPass(username, oldPass)) {
            dao.updatePassword(username, newPass);
            return ResponseEntity.status(HttpStatus.OK).body("Đổi mật khẩu thành công");

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Đổi mật khẩu không thành công");
        }
    }
}
