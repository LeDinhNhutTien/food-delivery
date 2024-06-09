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

        String query = "SELECT o.OrderID, GROUP_CONCAT(DISTINCT p.`name` SEPARATOR ', ') AS productNames, " +
                "GROUP_CONCAT(DISTINCT selected_images.url SEPARATOR ', ') AS imageUrls, " +
                "o.CreationDate, o.OrderStatus " +
                "FROM orders o " +
                "JOIN orderitems od ON o.OrderID = od.OrderID " +
                "JOIN products p ON p.id = od.ProductID " +
                "JOIN (SELECT products_id, MIN(url) AS url FROM images GROUP BY products_id) AS selected_images " +
                "ON selected_images.products_id = p.id " +
                "JOIN customer c ON c.id_user = o.UserID " +
                "WHERE c.id_user = ? " +
                "GROUP BY o.OrderID, o.CreationDate, o.OrderStatus";
        try {
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setInt(1, id);
            resultSet = ps.executeQuery();

            while (resultSet.next()) {
                int orderId = resultSet.getInt("OrderID");
                String productNames = resultSet.getString("productNames");
                String imageUrls = resultSet.getString("imageUrls");
                String date = resultSet.getString("CreationDate");
                String status = resultSet.getString("OrderStatus");

                History history = new History(orderId, productNames, imageUrls, date, status);
                historyList.add(history);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return historyList;
    }



    // admin
    public List<History> getAllHistory() throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        List<History> historyList = new ArrayList<>();

        String query = "SELECT o.OrderID, GROUP_CONCAT(DISTINCT p.`name` SEPARATOR ', ') AS products, c.username, " +
                "o.CreationDate, SUM(od.Price) AS totalPrice, o.OrderStatus, " +
                "GROUP_CONCAT(DISTINCT selected_images.url SEPARATOR ', ') AS image_urls " +
                "FROM orders o " +
                "JOIN orderitems od ON o.OrderID = od.OrderID " +
                "JOIN products p ON p.id = od.ProductID " +
                "JOIN (SELECT products_id, MIN(url) AS url FROM images GROUP BY products_id) AS selected_images " +
                "ON selected_images.products_id = p.id " +
                "JOIN customer c ON c.id_user = o.UserID " +
                "GROUP BY o.OrderID, c.username, o.CreationDate, o.OrderStatus";
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
                String imageUrls = resultSet.getString("image_urls");

                History history = new History(orderId, products, username, date, totalPrice, status, imageUrls);
                historyList.add(history);
            }

        } catch (Exception ex) {
            // Handle exceptions
            ex.printStackTrace();
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                // Handle exceptions
                e.printStackTrace();
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

        String query = "SELECT o.OrderID, " +
                "GROUP_CONCAT(DISTINCT p.`name` SEPARATOR ', ') AS product_names, " +
                "GROUP_CONCAT(DISTINCT selected_images.url SEPARATOR ', ') AS image_urls, " +
                "o.CreationDate, " +
                "o.OrderStatus, " +
                "o.ShippingAddress, " +
                "SUM(od.Price) AS total_price " +
                "FROM orders o " +
                "JOIN orderitems od ON o.OrderID = od.OrderID " +
                "JOIN products p ON p.id = od.ProductID " +
                "JOIN (SELECT products_id, MIN(url) AS url FROM images GROUP BY products_id) AS selected_images " +
                "ON selected_images.products_id = p.id " +
                "JOIN customer c ON c.id_user = o.UserID " +
                "WHERE o.OrderID = ? " +
                "GROUP BY o.OrderID, o.CreationDate, o.OrderStatus";
        try {
            // Connect to the database
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);

            ps.setInt(1, id);

            resultSet = ps.executeQuery();

            // Process the results
            while (resultSet.next()) {
                // Read information of the order and add to the list
                int orderId = resultSet.getInt("OrderID");
                String productNames = resultSet.getString("product_names");
                String imageUrls = resultSet.getString("image_urls");
                String date = resultSet.getString("CreationDate");
                String status = resultSet.getString("OrderStatus");
                String address = resultSet.getString("ShippingAddress");
                double price = resultSet.getDouble("total_price");

                History history = new History(orderId, productNames, imageUrls, date, status, price, address);
                historyList.add(history);
            }

        } catch (Exception ex) {
            // Handle exceptions
            ex.printStackTrace();
        } finally {
            // Close resources in the finally block
            try {
                if (resultSet != null) resultSet.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                // Handle exceptions
                e.printStackTrace();
            }
        }
        return historyList;
    }
    public List<History> getHistoryInformationById(int id) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        List<History> historyList = new ArrayList<>();

        String query = "SELECT p.`name`, od.Quantity, od.Price, selected_images.url AS image_urls " +
                "FROM orders o " +
                "JOIN orderitems od ON o.OrderID = od.OrderID " +
                "JOIN products p ON p.id = od.ProductID " +
                "JOIN (SELECT products_id, MIN(url) AS url FROM images GROUP BY products_id) AS selected_images " +
                "ON selected_images.products_id = p.id " +
                "WHERE od.OrderID = ? ";

        try {
            // Connect to the database
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);

            ps.setInt(1, id);

            resultSet = ps.executeQuery();

            // Process the results
            while (resultSet.next()) {
                String productNames = resultSet.getString("name");
                String imageUrls = resultSet.getString("image_urls");
                int quantity = resultSet.getInt("Quantity");
                double price = resultSet.getDouble("Price");

                History history = new History(productNames, imageUrls,price, quantity);
                historyList.add(history);
            }

        } catch (Exception ex) {
            // Handle exceptions
            ex.printStackTrace();
        } finally {
            // Close resources in the finally block
            try {
                if (resultSet != null) resultSet.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                // Handle exceptions
                e.printStackTrace();
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
//        System.out.println(dao.getCustomerByIdOrder(10));
    }
}
