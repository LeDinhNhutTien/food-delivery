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
    public Customer authenticate(String username, String password) {
        String encryptedPassword = MD5Utils.encrypt(password);
        return customerRepository.findByUsernameAndPassword(username, encryptedPassword);
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
