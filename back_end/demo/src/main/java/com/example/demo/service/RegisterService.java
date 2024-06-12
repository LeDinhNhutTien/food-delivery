package com.example.demo.service;

import com.example.demo.modal.Customer;
import com.example.demo.repository.RegisterRepository;
import com.example.demo.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    @Autowired
    private RegisterRepository customerRepository;

    public boolean save(Customer customer) {
        // Encrypt password before save
        String encryptedPassword = MD5Utils.encrypt(customer.getPassword());
        customer.setPassword(encryptedPassword);
        customerRepository.save(customer);
        return true;
    }

    public boolean checkUsername(String username){
        return customerRepository.existsByUsername(username);
    }
}
