package com.example.demo.dao;

import com.example.demo.modal.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class HistoryDao {

    public List<History> getAllHistoryById(int id) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        List<History> historyList = new ArrayList<>();

        String query = "SELECT o.OrderID, p.`name`, i.url, o.CreationDate, o.OrderStatus " +
                "FROM orders o " +
                "JOIN orderitems od ON o.OrderID = od.OrderID " +
                "JOIN products p ON p.id = od.ProductID " +
                "JOIN images i ON i.products_id = p.id " +
                "JOIN customer c ON c.id_user = o.UserID " +
                "WHERE c.id_user = ?";
        try {
            // Connect to the database
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);

            ps.setInt(1, id);

            resultSet = ps.executeQuery(); // Execute the query without passing 'query' parameter

            // Process the results
            while (resultSet.next()) {
                // Read information of each product and add to the list
                int orderId = resultSet.getInt("OrderID");
                String name = resultSet.getString("name");
                String url = resultSet.getString("url");
                String date = resultSet.getString("CreationDate");
                String status = resultSet.getString("OrderStatus");

                // Create a History object and add to the list
                History history = new History(orderId, name, url, date, status);
                historyList.add(history);
            }

        } catch (Exception ex) {
            // Handle exceptions
        } finally {
            // Close resources in the finally block
            try {
                if (resultSet != null) resultSet.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                // Handle exceptions
            }
        }

        return historyList;
    }

    public List<History> getAllHistory() throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        List<History> historyList = new ArrayList<>();

        String query = "SELECT o.OrderID, GROUP_CONCAT(p.`name` SEPARATOR ', ') AS products, c.username, " +
                "o.CreationDate, SUM(od.Price) AS totalPrice, o.OrderStatus, i.url " +
                "FROM orders o " +
                "JOIN orderitems od ON o.OrderID = od.OrderID " +
                "JOIN products p ON p.id = od.ProductID " +
                "JOIN images i ON i.products_id = p.id " +
                "JOIN customer c ON c.id_user = o.UserID " +
                "GROUP BY o.OrderID, c.username, o.CreationDate, o.OrderStatus, i.url";
        try {
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);
            resultSet = ps.executeQuery();

            while (resultSet.next()) {
                int orderId = resultSet.getInt("OrderID");
                String products = resultSet.getString("products");
                String username = resultSet.getString("username");
                String date = resultSet.getString("CreationDate");
                String status = resultSet.getString("OrderStatus");
                double totalPrice = resultSet.getDouble("totalPrice");
                String url = resultSet.getString("url");

                History history = new History(orderId, products, username, date, totalPrice, status, url);
                historyList.add(history);
            }

        } catch (Exception ex) {
            // Handle exceptions
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                // Handle exceptions
            }
        }

        return historyList;
    }

    public Customer getCustomerByIdOrder(int id) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        Customer customer = null;

        String query = "SELECT c.username, c.address, c.phone " +
                "FROM orders o " +
                "JOIN customer c ON c.id_user = o.UserID " +
                "WHERE o.OrderID = ?";
        try {
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setInt(1, id);

            resultSet = ps.executeQuery();

            while (resultSet.next()) {
                String username = resultSet.getString("username");
                String address = resultSet.getString("address");
                String phone = resultSet.getString("phone");

                customer = new Customer(username, phone, address);
            }

        } catch (Exception ex) {
            // Handle exceptions
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                // Handle exceptions
            }
        }

        return customer;
    }
    public List<History> getHistoryById(int id) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        List<History> historyList = new ArrayList<>();

        String query = "SELECT o.OrderID, p.`name`, i.url, o.CreationDate, o.OrderStatus, od.Quantity, od.Price " +
                "FROM orders o " +
                "JOIN orderitems od ON o.OrderID = od.OrderID " +
                "JOIN products p ON p.id = od.ProductID " +
                "JOIN images i ON i.products_id = p.id " +
                "JOIN customer c ON c.id_user = o.UserID " +
                "WHERE o.OrderID = ?";
        try {
            // Connect to the database
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);

            ps.setInt(1, id);

            resultSet = ps.executeQuery(); // Execute the query without passing 'query' parameter

            // Process the results
            while (resultSet.next()) {
                // Read information of each product and add to the list
                int orderId = resultSet.getInt("OrderID");
                String name = resultSet.getString("name");
                String url = resultSet.getString("url");
                String date = resultSet.getString("CreationDate");
                String status = resultSet.getString("OrderStatus");
                int quantity = Integer.parseInt(resultSet.getString("Quantity"));
                double price = Double.parseDouble(resultSet.getString("Price"));

                History history = new History(orderId, name, url, date, status, price, quantity);
                historyList.add(history);
            }

        } catch (Exception ex) {
            // Handle exceptions
        } finally {
            // Close resources in the finally block
            try {
                if (resultSet != null) resultSet.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                // Handle exceptions
            }
        }
        return historyList;
    }

    public boolean updateHistoryById(int id) throws SQLException {
        Connection connection = null;
        int affect =0;
        boolean result =false;
        String query = "update orders\n" +
                "set OrderStatus = 'Đã hủy'\n" +
                "WHERE OrderID = ?";
        try {
            // Connect to the database
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setInt(1, id);

            affect = ps.executeUpdate();
            if (affect !=0) result = true;
        } catch (Exception ex) {
        } finally {
        try {
            if (connection != null) connection.close();
        } catch (SQLException e) {
            // Handle exceptions
        }
    }
        return result;
    }

    public boolean updateHistory(int id, String state) throws SQLException {
        Connection connection = null;
        int affect =0;
        boolean result =false;
        String query = "update orders\n" +
                "set OrderStatus = ? \n" +
                "WHERE OrderID = ?";
        try {
            // Connect to the database
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setString(1, state);
            ps.setInt(2, id);

            affect = ps.executeUpdate();
            if (affect !=0) result = true;
        } catch (Exception ex) {
        } finally {
            try {
                if (connection != null) connection.close();
            } catch (SQLException e) {
                // Handle exceptions
            }
        }
        return result;
    }
    public static void main(String[] args) throws SQLException {
        HistoryDao dao = new HistoryDao();
//        for (History h : dao.getHistoryById(1) ){
//            System.out.println(h);
//        }
        System.out.println(dao.getCustomerByIdOrder(10));
    }
}
