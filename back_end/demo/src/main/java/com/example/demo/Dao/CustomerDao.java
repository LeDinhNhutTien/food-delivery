package com.example.demo.Dao;

import com.example.demo.Dao.DatabaseConnectionTest;

import com.example.demo.Modal.*;
import com.example.demo.utils.*;
import com.example.demo.Dao.*;

import java.sql.*;

public class CustomerDao {
    MD5Utils utils = new MD5Utils();
    public boolean sign(String user, String pass) {
        String query = "INSERT into customer(username, password, first_name, last_name, phone, address, role)\n" +
                "VALUES(?, ?, \"\", \"\", \"\", \"\", \"user\")";

        try (Connection connection = com.example.demo.Dao.DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, user);
            ps.setString(2, utils.encrypt(pass));  // Assuming utils.encrypt securely hashes the password
            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                return false;
            }
            try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean login(String user, String pass) {
        String query = "SELECT * FROM customer WHERE username = ? AND password = ?";

        try (Connection connection = com.example.demo.Dao.DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setString(1, user);
            ps.setString(2, utils.encrypt(pass));

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return true; // Đăng nhập thành công
                } else {
                    return false; // Sai tên người dùng hoặc mật khẩu
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static void main(String[] args) {
        CustomerDao dao = new CustomerDao();
        MD5Utils utils = new MD5Utils();
//        System.out.println(dao.sign("tien bip 897", "123456"));
        System.out.println(dao.login("Tien", "123456"));
    }
}
