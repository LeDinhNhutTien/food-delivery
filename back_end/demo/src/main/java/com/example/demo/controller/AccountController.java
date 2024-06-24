package com.example.demo.controller;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.modal.Customer;
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
    public ResponseEntity<?> updateCustomerInfo(@RequestBody Customer customer) {
        try {
            // Lấy thông tin người dùng từ cơ sở dữ liệu dựa trên id_user
            CustomerDTO existingCustomer = service.getCustomerById(customer.getId_user());

            if (existingCustomer != null) {
                // Cập nhật thông tin từ người dùng mới vào đối tượng đã lấy từ DB
                existingCustomer.setFirst_name(customer.getFirst_name());
                existingCustomer.setLast_name(customer.getLast_name());
                existingCustomer.setPhone(customer.getPhone());
                existingCustomer.setAddress(customer.getAddress());

                // Lưu thông tin cập nhật vào cơ sở dữ liệu
                CustomerDTO updatedCustomer = service.updateCustomer(existingCustomer);

                if (updatedCustomer != null) {
                    return ResponseEntity.ok(updatedCustomer);
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cập nhật không thành công");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người dùng với id_user: " + customer.getId_user());
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi cập nhật thông tin tài khoản.");
        }
    }
}
