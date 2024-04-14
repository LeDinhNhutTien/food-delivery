package com.example.demo.Dao;

import com.example.demo.Modal.*;
import com.example.demo.modal.Product;
import com.example.demo.service.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class ProductDAO {

    private static final Logger LOGGER = Logger.getLogger(ProductDAO.class.getName());

    public List<com.example.demo.modal.Product> getAllProducts() {
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        List<com.example.demo.modal.Product> productList = new ArrayList<>();

        try {
            // Connect to the database
            connection = com.example.demo.Dao.DatabaseConnectionTest.getConnection();
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
                com.example.demo.modal.Product product = new Product(id, name, type, description, price, imageUrls, specification, dateTime);
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


    public static void main(String[] args) {
//        ProductDAO dao = new ProductDAO();
//        System.out.println(dao.getAllProducts().size());

    }
}
