package com.example.demo.service;

import com.example.demo.modal.Customer;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    // login
    public boolean validateLogin(String username, String password) {
        Customer customer = customerRepository.findByUsername(username);
        if (customer != null) {
            String encryptedPassword = MD5Utils.encrypt(password);
            return customer.getPassword().equals(encryptedPassword);
        }
        return false;
    }
    public Customer getCustomerByUsername(String username) {
        return customerRepository.findByUsername(username);
    }

    // register
    public boolean addCustomer(Customer customer) {
        // Encrypt password before save
        String encryptedPassword = MD5Utils.encrypt(customer.getPassword());
        customer.setPassword(encryptedPassword);
        customerRepository.save(customer);
        return true;
    }

    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }
    // check username
    public boolean checkUsername(String username){
        return customerRepository.existsByUsername(username);
    }

    public Customer getCustomerById(int id){
        return customerRepository.findById(id);
    }
}
