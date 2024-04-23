package com.example.demo.Controller;

import com.example.demo.Dao.CustomerDao;
import com.example.demo.Modal.Customer;
import jakarta.servlet.http.HttpServletRequest;
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

//        if(username.isEmpty() || firstName == null){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tên đăng nhập không được để trống");
//        }
//        if (firstName.isEmpty() || firstName == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu mới không được để trống");
//        }
//        if(lastName.isEmpty() || lastName == null){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu cũ không được để trống");
//        }
//        if (phone.isEmpty() || phone == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu mới không được để trống");
//        }
//        if (address.isEmpty() || address == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mật khẩu mới không được để trống");
//        }
//        if(dao.checkUsername(username)){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tên đăng nhập đã tồn tại");
//        }
         if (dao.updateAccount(username, firstName, lastName, phone, address)) {
            return ResponseEntity.status(HttpStatus.OK).body("Thông tin đã được cập nhật");

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cập nhật không thành công");
        }
    }

}
