package com.example.demo.service;

import com.example.demo.modal.Customer;
import com.example.demo.repository.LoginRepository;
import com.example.demo.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    LoginRepository loginRepository;

    public boolean validateLogin(String username, String password) {
        Customer customer = loginRepository.findByUsername(username);
        if (customer != null) {
            String encryptedPassword = MD5Utils.encrypt(password);
            return customer.getPassword().equals(encryptedPassword);
        }
        return false;
    }
    public Customer getCustomerByUsername(String username) {
        return loginRepository.findByUsername(username);
    }
}
