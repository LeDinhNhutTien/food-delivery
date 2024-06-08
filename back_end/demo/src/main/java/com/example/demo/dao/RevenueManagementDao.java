package com.example.demo.dao;

import com.example.demo.modal.RevenueRecord;
import com.example.demo.modal.RevenueRecordMonth;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RevenueManagementDao {

    public List<RevenueRecord> calculateMonthlyRevenue(int yearChosen) throws SQLException {
        List<RevenueRecord> revenueRecords = new ArrayList<>();
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            // Connect to the database
            connection = com.example.demo.dao.DatabaseConnectionTest.getConnection();
            statement = connection.createStatement();

            // Execute the query
            String query = "SELECT months.Month, IFNULL(SUM(orders.TotalAmount), 0) AS TotalRevenue " +
                    "FROM (SELECT 1 AS Month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 " +
                    "UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) AS months " +
                    "LEFT JOIN orders ON YEAR(orders.CreationDate) = " + yearChosen + " AND MONTH(orders.CreationDate) = months.Month " +
                    "GROUP BY months.Month ORDER BY months.Month";
            resultSet = statement.executeQuery(query);

            // Process the results
            while (resultSet.next()) {
                int month = resultSet.getInt("Month");
                double totalRevenue = resultSet.getDouble("TotalRevenue");
                revenueRecords.add(new RevenueRecord(yearChosen, month, totalRevenue));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close all resources
            try {
                if (resultSet != null) resultSet.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return revenueRecords;
    }
    public List<RevenueRecordMonth> calculateMonthlyRevenueForMonth(int month, int year) throws SQLException {
        List<RevenueRecordMonth> revenueRecordMonths = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            // Connect to the database
            connection = com.example.demo.dao.DatabaseConnectionTest.getConnection();

            // Prepare the query
            String query = "SELECT days.DayOfMonth, IFNULL(SUM(orders.TotalAmount), 0) AS TotalRevenue " +
                    "FROM (SELECT DISTINCT YEAR(CreationDate) AS Year FROM orders) AS years " +
                    "CROSS JOIN (SELECT 1 AS Month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 " +
                    "UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) AS months " +
                    "CROSS JOIN (SELECT 1 AS DayOfMonth UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 " +
                    "UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 " +
                    "UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 " +
                    "UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 UNION SELECT 26 UNION SELECT 27 " +
                    "UNION SELECT 28 UNION SELECT 29 UNION SELECT 30) AS days " +
                    "LEFT JOIN orders ON YEAR(orders.CreationDate) = ? AND MONTH(orders.CreationDate) = ? AND DAY(orders.CreationDate) = days.DayOfMonth " +
                    "WHERE years.Year = ? AND months.Month = ? " +
                    "GROUP BY years.Year, months.Month, days.DayOfMonth " +
                    "ORDER BY years.Year, months.Month, days.DayOfMonth";
            statement = connection.prepareStatement(query);
            statement.setInt(1, year);
            statement.setInt(2, month);
            statement.setInt(3, year);
            statement.setInt(4, month);

            // Execute the query
            resultSet = statement.executeQuery();

            // Process the results
            while (resultSet.next()) {
                int day = resultSet.getInt("DayOfMonth");
                double totalRevenue = resultSet.getDouble("TotalRevenue");
                revenueRecordMonths.add(new RevenueRecordMonth(day, totalRevenue));
            }

        } catch (SQLException e) {
            // Handle SQLException appropriately
            e.printStackTrace();
        } finally {
            // Close all resources
            try {
                if (resultSet != null) resultSet.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return revenueRecordMonths;
    }

    public static void main(String[] args) throws SQLException {
        RevenueManagementDao r = new RevenueManagementDao();
        System.out.println(r.calculateMonthlyRevenueForMonth(6,2024).size());
    }
}
