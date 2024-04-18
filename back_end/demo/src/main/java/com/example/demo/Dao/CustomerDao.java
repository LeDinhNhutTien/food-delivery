package com.example.demo.Dao;

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

    public Integer getById(String user, String pass) {
        String query = "SELECT id_user  FROM customer WHERE username = ? AND password = ?";

        try (Connection connection = com.example.demo.Dao.DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setString(1, user);
            ps.setString(2, utils.encrypt(pass));

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt("id_user"); // Trả về ID của người dùng nếu đăng nhập thành công
                } else {
                    return null; // Trả về null nếu sai tên người dùng hoặc mật khẩu
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null; // Trả về null nếu có lỗi xảy ra
        }
    }

    public boolean checkPass(String username, String pass) {
        String query = "SELECT * FROM customer WHERE username = ? AND password = ?";

        try (Connection connection = com.example.demo.Dao.DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setString(1, username);
            ps.setString(2, utils.encrypt(pass));

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return true; // check success
                } else {
                    return false; // check failed
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public boolean updatePassword(String username, String newPassword) {
        String query = "UPDATE customer SET password = ? WHERE username = ?";

        try (Connection connection = com.example.demo.Dao.DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setString(1, utils.encrypt(newPassword));
            ps.setString(2, username);

            int rowsUpdated = ps.executeUpdate();
            return rowsUpdated > 0; // Trả về true nếu có ít nhất một hàng được cập nhật
        } catch (SQLException e) {
            e.printStackTrace();
            return false; // Trả về false nếu có lỗi xảy ra
        }
    }

    public static void main(String[] args) {
        CustomerDao dao = new CustomerDao();
        MD5Utils utils = new MD5Utils();
//        System.out.println(dao.sign("tien bip 897", "123456"));
//        System.out.println(dao.login("Tien", "123456"));
//        System.out.println(dao.getById("Duy", "123456"));
        System.out.println(dao.checkPass("Duy", "123456"));
    }
}