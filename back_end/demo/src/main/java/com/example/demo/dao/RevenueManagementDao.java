package com.example.demo.dao;

import com.example.demo.modal.Product;
import com.example.demo.modal.RevenueRecord;
import java.util.logging.Logger;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RevenueManagementDao {


    public List<RevenueRecord> calculateMonthlyRevenue() throws SQLException {
        List<RevenueRecord> revenueRecords = new ArrayList<>();
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            // Connect to the database
            connection = com.example.demo.dao.DatabaseConnectionTest.getConnection();
            statement = connection.createStatement();

            // Execute the query
            String query = "SELECT years.Year, months.Month, IFNULL(SUM(orders.TotalAmount), 0) AS TotalRevenue " +
                    "FROM (SELECT DISTINCT YEAR(CreationDate) AS Year FROM orders) AS years " +
                    "CROSS JOIN (SELECT 1 AS Month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 " +
                    "UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) AS months " +
                    "LEFT JOIN orders ON YEAR(orders.CreationDate) = years.Year AND MONTH(orders.CreationDate) = months.Month " +
                    "GROUP BY years.Year, months.Month ORDER BY years.Year, months.Month";
            resultSet = statement.executeQuery(query);

            // Process the results
            while (resultSet.next()) {
                int year = resultSet.getInt("Year");
                int month = resultSet.getInt("Month");
                double totalRevenue = resultSet.getDouble("TotalRevenue");
                revenueRecords.add(new RevenueRecord(year, month, totalRevenue));

            }


        } catch (SQLException e) {

        } finally {
            // Close all resources
            try {
                if (resultSet != null) resultSet.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {

            }
        }

        return revenueRecords;
    }

    public static void main(String[] args) throws SQLException {
        RevenueManagementDao r = new RevenueManagementDao();
        System.out.println(r.calculateMonthlyRevenue().size());
    }
}
