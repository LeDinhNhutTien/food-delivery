package com.example.demo.controller;

import com.example.demo.dao.AdminManagementCustomerDao;
import com.example.demo.dao.AdminManagementDao;
import com.example.demo.modal.AdminManagement;
import com.example.demo.modal.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/managementCustomerAdmin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminManagementCustomerController {
    AdminManagementCustomerDao dao = new AdminManagementCustomerDao()  ;

    @GetMapping
    public List<Customer> getAllCustomer() {
        List<Customer> customers = dao.getAllCustomer();

        return customers;
    }
    @PostMapping
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) {
        try {
            // Thực hiện thêm mới khách hàng vào cơ sở dữ liệu
            dao.addCustomer(customer);
            return ResponseEntity.ok("Thêm người dùng thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi thêm người dùng");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
        try {

            customer.setId_user(id);
            dao.updateCustomer(customer);
            return ResponseEntity.ok("Cập nhật thông tin người dùng thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi cập nhật thông tin người dùng");
        }
    }
}
