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
        String query = "SELECT * FROM customer";
        List<Customer> customers = new ArrayList<>();
        try (Connection connection = DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt(1);
                String email = rs.getString(2);
                String password = rs.getString(3);
                String firtName = rs.getString(4);
                String lastName = rs.getString(5);
                String phone = rs.getString(6);
                String address = rs.getString(7);
                String role = rs.getString(8);
                String date = rs.getString(9);
                int status = rs.getInt(10);
                Customer c = new Customer(id, email, password, firtName, lastName, phone, address, role, date, status);
                customers.add(c);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        return customers;
    }

    public void addCustomer(Customer c) {
        String query = "INSERT INTO customer (username, password, first_name, last_name, phone, address, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection connection = DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setString(1, c.getUsername());
            ps.setString(2, c.getPassword());
            ps.setString(3, c.getFirst_name());
            ps.setString(4, c.getLast_name());
            ps.setString(5, c.getPhone());
            ps.setString(6, c.getAddress());
            ps.setString(7, c.getRole());
            ps.setInt(8, 1);

            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            // Xử lý lỗi khi thêm khách hàng vào cơ sở dữ liệu
        }
    }
    public void updateCustomer(Customer c) {
        String query = "UPDATE customer SET username=?, password=?, first_name=?, last_name=?, phone=?, address=?, role=?, status=? WHERE id_user=?";

        try (Connection connection = DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, c.getUsername());
            ps.setString(2, c.getPassword());
            ps.setString(3, c.getFirst_name());
            ps.setString(4, c.getLast_name());
            ps.setString(5, c.getPhone());
            ps.setString(6, c.getAddress());
            ps.setString(7, c.getRole());
            ps.setInt(8, c.getStatus());
            ps.setInt(9, c.getId_user());

            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            // Xử lý lỗi khi cập nhật thông tin khách hàng
        }
    }

    public static void main(String[] args) {
        AdminManagementCustomerDao   dao = new AdminManagementCustomerDao();
        System.out.println(dao.getAllCustomer());
    }
}
