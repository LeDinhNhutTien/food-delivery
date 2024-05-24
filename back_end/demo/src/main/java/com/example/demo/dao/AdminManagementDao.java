package com.example.demo.dao;

import com.example.demo.modal.Customer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class AdminManagementDao {
    public  String getDoanhSoHangThang(int thang) {

        String query = "SELECT SUM(TotalAmount) AS DanhSo FROM orders WHERE MONTH(CreationDate) = ?";

        try (Connection connection = DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setInt(1, thang);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {

                    return rs.getString(1); // check success
                } else {
                    return null; // check failed
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
    public  String getSoLuongSanPham(int thang) {

        String query = "SELECT SUM(oi.Quantity) FROM orderitems oi JOIN orders o ON oi.OrderID = o.OrderID WHERE MONTH(o.CreationDate) = ?";

        try (Connection connection = DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setInt(1, thang);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {

                    return rs.getString(1); // check success
                } else {
                    return null; // check failed
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
    public String getTongDoanhThu() {
        String query = "SELECT SUM(TotalAmount) AS TongDoanhThu FROM orders";

        try (Connection connection = DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getString("TongDoanhThu"); // return total revenue
                } else {
                    return null; // No revenue found
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public  String getNguoiMoi(int thang) {

        String query = "SELECT COUNT(*) AS NguoiDangKy FROM customer WHERE MONTH(create_date) = ?";

        try (Connection connection = DatabaseConnectionTest.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {

            ps.setInt(1, thang);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {

                    return rs.getString(1); // check success
                } else {
                    return null; // check failed
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }


    public static void main(String[] args) {
        LocalDate currentDate = LocalDate.now();
        int currentMonth = currentDate.getMonthValue();

    }
}
