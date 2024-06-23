package com.example.demo.service;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.modal.Customer;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    public CustomerDTO authenticate(String username, String password) {
        String encryptedPassword = MD5Utils.encrypt(password);
        Customer customer = customerRepository.findByUsernameAndPassword(username, encryptedPassword);

        // Convert Customer entity to CustomerDTO
        if (customer != null) {
            return convertToCustomerDTO(customer);
        }
        return null;
    }

    private CustomerDTO convertToCustomerDTO(Customer customer) {
        return new CustomerDTO(
                customer.getId_user(),
                customer.getUsername(),
                customer.getFirst_name(),
                customer.getLast_name(),
                customer.getPassword(),
                customer.getPhone(),
                customer.getAddress(),
                customer.getRole(),
                customer.getCreateDate().toString(), // Assuming LocalDate to String conversion
                customer.getStatus()
        );
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

    public boolean checkPass(String username, String password) {
        return customerRepository.checkPass(username, password);
    }

    public boolean updatePassword(String username, String newPassword) {
        int updatedRows = customerRepository.updatePassword(username, newPassword);
        return updatedRows > 0;
    }
}
