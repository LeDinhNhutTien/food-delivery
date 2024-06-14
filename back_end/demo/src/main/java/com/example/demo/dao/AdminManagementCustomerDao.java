package com.example.demo.dao;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.modal.Customer;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminManagementCustomerDao {
    @Autowired
    private CustomerRepository customerRepository;

    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CustomerDTO convertToDto(Customer customer) {
        return new CustomerDTO(
                customer.getId_user(),
                customer.getUsername(),
                customer.getFirst_name(),
                customer.getLast_name(),
                customer.getPassword(),
                customer.getPhone(),
                customer.getAddress(),
                customer.getRole(),
                customer.getCreateDate().toString(), // Assuming createDate is a String in the DTO
                customer.getStatus()
        );
    }
    public void addCustomer(Customer customer) {
        String encryptedPassword = MD5Utils.encrypt(customer.getPassword());
        customer.setPassword(encryptedPassword);
        customerRepository.save(customer);
    }

    public void updateCustomer(Customer customer) {
        String encryptedPassword = MD5Utils.encrypt(customer.getPassword());
        customer.setPassword(encryptedPassword);
        customerRepository.save(customer);
    }
}
