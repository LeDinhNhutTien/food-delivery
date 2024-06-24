package com.example.demo.service;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.modal.Customer;
import com.example.demo.modal.request.LoginRequest;
import com.example.demo.modal.request.RegisterRequest;
import com.example.demo.modal.response.AuthResponse;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.security.CustomUserDetails;
import com.example.demo.security.JwtToken;
import com.example.demo.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CustomerService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    private JwtToken jwtToken;

//    public CustomerDTO authenticate(String username, String password) {
//        String encryptedPassword = passwordEncoder.encode(password);
//        Customer customer = customerRepository.findByUsernameAndPassword(username, encryptedPassword);
//
//        // Convert Customer entity to CustomerDTO
//        if (customer != null) {
//            return convertToCustomerDTO(customer);
//        }
//        return null;
//    }

//    public CustomerDTO authenticate(LoginRequest request) {
////        String encryptedPassword = passwordEncoder.encode(request);
//        Customer customer = login(request);
//
//        // Convert Customer entity to CustomerDTO
//        if (customer != null) {
//            return convertToCustomerDTO(customer);
//        }
//        return null;
//    }

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
    public AuthResponse addCustomer(RegisterRequest  request) {
        // Encrypt password before save
        String encryptedPassword = passwordEncoder.encode(request.getPassword());

        Customer customer = new Customer();
        customer.setUsername(request.getUsername());
        customer.setPassword(encryptedPassword);
        customer.setRole("user");

        customerRepository.save(customer);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setUsername(customer.getUsername());
        return authResponse;
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

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        Customer user = customerRepository.findByUsername(request.getUsername());
        if (user != null) {
            CustomUserDetails userSecurity = new CustomUserDetails(user);

            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("username", user.getUsername());
            extraClaims.put("authorities", userSecurity.getAuthorities());

            String accessToken = jwtToken.generateToken(extraClaims, userSecurity);
            String refreshToken = jwtToken.generateRefreshToken(userSecurity);

            AuthResponse authResponse = new AuthResponse();
            authResponse.setUsername(request.getUsername());
            authResponse.setAccessToken(accessToken);
            authResponse.setRefreshToken(refreshToken);
            return authResponse;
        }
        return null;
    }
}
