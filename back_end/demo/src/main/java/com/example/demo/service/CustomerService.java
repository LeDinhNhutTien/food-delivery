package com.example.demo.service;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.modal.Customer;
import com.example.demo.modal.request.LoginRequest;
import com.example.demo.modal.request.RegisterRequest;
import com.example.demo.modal.response.AuthResponse;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.security.CustomUserDetails;
import com.example.demo.security.JwtToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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

    public AuthResponse addCustomer(RegisterRequest request) {
        // Encrypt password before saving
        String encryptedPassword = passwordEncoder.encode(request.getPassword());
        Customer customer = new Customer();
        customer.setUsername(request.getUsername());
        customer.setPassword(encryptedPassword);
        customer.setRole("user");

        customerRepository.save(customer);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setId(Long.valueOf(customer.getId_user()));
        authResponse.setUsername(customer.getUsername());
        return authResponse;
    }


    public CustomerDTO updateCustomer(CustomerDTO customerDTO) {
        // Tìm người dùng cần cập nhật trong cơ sở dữ liệu
        Customer existingCustomer = customerRepository.findById(customerDTO.getId_user());


        // Cập nhật thông tin từ DTO vào entity đã có
        existingCustomer.setFirst_name(customerDTO.getFirst_name());
        existingCustomer.setLast_name(customerDTO.getLast_name());
        existingCustomer.setPhone(customerDTO.getPhone());
        existingCustomer.setAddress(customerDTO.getAddress());

        // Lưu thay đổi vào cơ sở dữ liệu
        Customer savedCustomer = customerRepository.save(existingCustomer);

        // Trả về DTO của người dùng sau khi đã cập nhật
        return new CustomerDTO(
                savedCustomer.getId_user(),
                savedCustomer.getUsername(),
                savedCustomer.getFirst_name(),
                savedCustomer.getLast_name(),
                savedCustomer.getPhone(),
                savedCustomer.getAddress(),
                savedCustomer.getRole(),
                savedCustomer.getCreateDate().toString(),  // Assuming LocalDate to String conversion
                savedCustomer.getStatus()
        );
    }

    public boolean checkUsername(String username) {
        return customerRepository.existsByUsername(username);
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
            String refreshToken = jwtToken.generateRefreshToken(userSecurity, Long.valueOf(user.getId_user()));

            AuthResponse authResponse = new AuthResponse();
            authResponse.setId(Long.valueOf(user.getId_user()));
            authResponse.setUsername(request.getUsername());
            authResponse.setAccessToken(accessToken);
            authResponse.setRefreshToken(refreshToken);
            return authResponse;
        }
        return null;
    }
    public CustomerDTO save(CustomerDTO customerDTO) {
        // Assuming there is a conversion method or constructor in CustomerDTO to create Customer
        Customer customer = new Customer(

                customerDTO.getFirst_name(),
                customerDTO.getLast_name(),
                customerDTO.getPhone(),
                customerDTO.getAddress(),
                customerDTO.getRole(),
                customerDTO.getCreateDate().toString(),  // Assuming LocalDate to String conversion
                customerDTO.getStatus()
        );

        // Save the customer entity using the existing save method
        Customer savedCustomer = customerRepository.save(customer);

        // Return a CustomerDTO object representing the saved customer
        return new CustomerDTO(
                savedCustomer.getId_user(),
                savedCustomer.getUsername(),
                savedCustomer.getFirst_name(),
                savedCustomer.getLast_name(),
                savedCustomer.getPhone(),
                savedCustomer.getAddress(),
                savedCustomer.getRole(),
                savedCustomer.getCreateDate().toString(),  // Assuming LocalDate to String conversion
                savedCustomer.getStatus()
        );
    }
    public CustomerDTO getCustomerById(int id) {
        Optional<Customer> customerOptional = Optional.ofNullable(customerRepository.findById(id));
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            return new CustomerDTO(
                    customer.getId_user(),
                    customer.getUsername(),
                    customer.getFirst_name(),
                    customer.getLast_name(),
                    customer.getPhone(),
                    customer.getAddress(),
                    customer.getRole(),
                    customer.getCreateDate().toString(),  // Assuming LocalDate to String conversion
                    customer.getStatus()
            );
        } else {
            return null; // or throw NotFoundException or other appropriate exception
        }
    }
}
