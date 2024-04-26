package com.example.demo.Controller;

import com.example.demo.Dao.CustomerDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ForgetPassController {
    CustomerDao dao = new CustomerDao();

    @PostMapping("/checkUsername")
    public ResponseEntity<?> checkUsername(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");

        if (username.isEmpty() || username == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tên đăng nhập không được để trống");
        }
        else if (dao.checkUsername(username)) {
            return ResponseEntity.status(HttpStatus.OK).body("Username Ok");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username không tồn tại");
        }
    }
//    @PostMapping("/changePass")
//        public ResponseEntity<?> checkUsername(@RequestBody Map<String, String> credentials) {
//            String newPass = credentials.get("newPass");
//            String rePass = credentials.get("rePass");
//
//            if(rePass.isEmpty() || rePass == null){
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu cũ không được để trống");
//            }
//            if (newPass.isEmpty() || newPass == null) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu mới không được để trống");
//            }
//            if(!dao.checkPass(username, oldPass)){
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu cũ không chính xác");
//            }
//            else if (dao.checkPass(username, oldPass)) {
//                dao.updatePassword(username, newPass);
//                return ResponseEntity.status(HttpStatus.OK).body("Đổi mật khẩu thành công");
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Đổi mật khẩu không thành công");
//            }
//        }
}
