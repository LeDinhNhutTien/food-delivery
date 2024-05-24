package com.example.demo.dao;

import com.example.demo.modal.Customer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AdminManagementCustomerDao {
    public List<Customer> getAllCustomer() {
        String query = "SELECT *  FROM customer";
        List<Customer> customers = new ArrayList<>();
        try (Connection connection = DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    int id = rs.getInt(1);
                    String email = rs.getString(2);
                    String password = rs.getString(3);
                    String firtName = rs.getString(4);
                    String lastName = rs.getString(5);
                    String phone = rs.getString(6);
                    String address = rs.getString(7);
                    String role = rs.getString(8);
                    String date = rs.getString(9);
                    Customer c = new Customer(id,email,password,firtName,lastName,phone,address,role,date);
                    customers.add(c);
                } else {
                    return customers; // No revenue found
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return customers;
    }
}
