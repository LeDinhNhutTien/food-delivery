package com.example.demo.controller;

import com.example.demo.service.AdminManagementCustomerService;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.modal.Customer;
import com.example.demo.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/managementCustomerAdmin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminManagementCustomerController {
    @Autowired
    private AdminManagementCustomerService dao;

    @GetMapping
    public List<CustomerDTO> getAllCustomers() {
        List<CustomerDTO> customers = dao.getAllCustomers();
        for (CustomerDTO customer : customers) {

            String hashedPassword = MD5Utils.encrypt(customer.getPassword());
            customer.setPassword(hashedPassword);
            System.out.println(customer.getPassword()+": " + MD5Utils.encrypt(customer.getPassword()));
        }
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
            System.out.println(customer);
            dao.updateCustomer(customer);
            return ResponseEntity.ok("Cập nhật thông tin người dùng thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi cập nhật thông tin người dùng");
        }
    }
}
