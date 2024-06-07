package com.example.demo.dao;
import com.example.demo.modal.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class ProductDAO {

    private static final Logger LOGGER = Logger.getLogger(ProductDAO.class.getName());

    public List<Product> getAllProducts() {
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        List<Product> productList = new ArrayList<>();

        try {
            // Connect to the database
            connection = com.example.demo.dao.DatabaseConnectionTest.getConnection();
            statement = connection.createStatement();

            // Execute the query
            String query = "SELECT p.id, p.name, p.description, p.price, GROUP_CONCAT(i.url) AS image_urls, p.specification, p.dateTime, p.type_id\n" +
                    "FROM products p\n" +
                    "LEFT JOIN images i ON p.id = i.products_id\n" +
                    "GROUP BY p.id";
            resultSet = statement.executeQuery(query);

            // Process the results
            while (resultSet.next()) {
                // Read information of each product and add to the list
                Long id = resultSet.getLong("id");
                String name = resultSet.getString("name");
                String description = resultSet.getString("description");
                Double price = resultSet.getDouble("price");
                // Retrieve image URLs as a list
                String imageUrl = resultSet.getString("image_urls");
                String specification = resultSet.getString("specification");
                String dateTime = resultSet.getString("dateTime");
                int type = resultSet.getInt("type_id");
                // Create a list of image URLs
                List<String> imageUrls = new ArrayList<>();
                if (imageUrl != null && !imageUrl.isEmpty()) {
                    String[] urls = imageUrl.split(",");
                    for (String url : urls) {
                        imageUrls.add(url.trim());
                    }
                }
                // Create a Product object and add to the list
                Product product = new Product(id, name, type, description, price, imageUrls, specification, dateTime);
                productList.add(product);
            }

            LOGGER.info("Number of products retrieved: " + productList.size());
        } catch (SQLException e) {
            LOGGER.severe("Error getting products: " + e.getMessage());
        } finally {
            // Close all resources
            try {
                if (resultSet != null) resultSet.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                LOGGER.severe("Error closing resources: " + e.getMessage());
            }
        }

        return productList;
    }
    public static List<String> getSearchSuggestions(String query) {
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        List<String> suggestions = new ArrayList<>();

        try {
            // Connect to the database
            connection = com.example.demo.dao.DatabaseConnectionTest.getConnection();
            statement = connection.createStatement();

            // Execute the query to get search suggestions
            String searchQuery = "SELECT DISTINCT name FROM products WHERE name LIKE '%" + query + "%'";
            resultSet = statement.executeQuery(searchQuery);

            // Process the results
            while (resultSet.next()) {
                // Read suggestion and add to the list
                String suggestion = resultSet.getString("name");
                suggestions.add(suggestion);
            }

            LOGGER.info("Number of suggestions retrieved: " + suggestions.size());
        } catch (SQLException e) {
            LOGGER.severe("Error getting search suggestions: " + e.getMessage());
        } finally {
            // Close all resources
            try {
                if (resultSet != null) resultSet.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                LOGGER.severe("Error closing resources: " + e.getMessage());
            }
        }

        return suggestions;
    }


    public List<Product> getProductById(long id) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        List<String> imageUrls = getImageProductById(id);
        List<Product> productList = new ArrayList<>();
        Product product = null;

        String query = "SELECT p.id, p.name, p.price, p.description, p.type_id\n" +
                "FROM products p\n" +
                "WHERE p.id = ?";
        try {
            // Connect to the database
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);

            ps.setLong(1, id);

            resultSet = ps.executeQuery(); // Execute the query without passing 'query' parameter

            while (resultSet.next()) {
                Long idProduct = resultSet.getLong("id");
                String name = resultSet.getString("name");
                double price = Double.parseDouble(resultSet.getString("price"));
                String description = resultSet.getString("description");
                int type = resultSet.getInt("type_id");

                 product = new Product(idProduct,name, description, price, imageUrls, type);
                productList.add(product);
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
        return productList;
    }

    public List<String> getImageProductById(long id) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        List<String> list = new ArrayList<>();

        String query = "SELECT i.url\n" +
                "FROM images i \n" +
                "WHERE i.products_id = ?";
        try {
            // Connect to the database
            connection = DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);

            ps.setLong(1, id);

            resultSet = ps.executeQuery(); // Execute the query without passing 'query' parameter

            // Process the results
            while (resultSet.next()) {
                String url = resultSet.getString("url");
                list.add(url);
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
        return list;
    }
    public static void main(String[] args) throws SQLException {
        ProductDAO dao = new ProductDAO();
        System.out.println(dao.getProductById(1));

    }
}
