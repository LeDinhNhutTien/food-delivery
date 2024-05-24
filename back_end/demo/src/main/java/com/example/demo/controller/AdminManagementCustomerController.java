package com.example.demo.controller;

import com.example.demo.dao.AdminManagementCustomerDao;
import com.example.demo.dao.AdminManagementDao;
import com.example.demo.modal.AdminManagement;
import com.example.demo.modal.Customer;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
