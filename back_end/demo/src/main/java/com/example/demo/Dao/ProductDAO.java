package com.example.demo.Dao;

import com.example.demo.Modal.Product;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
            // Kết nối đến cơ sở dữ liệu
            connection = DatabaseConnectionTest.getConnection();
            statement = connection.createStatement();

            // Thực thi truy vấn
            String query = "SELECT * FROM products";
            resultSet = statement.executeQuery(query);

            // Xử lý kết quả
            while (resultSet.next()) {
                // Đọc thông tin của mỗi sản phẩm và thêm vào danh sách
                Long id = resultSet.getLong("id");
                String name = resultSet.getString("name");
                String description = resultSet.getString("description");
                Double price = resultSet.getDouble("price");
                String imageUrl = resultSet.getString("imageUrl");
                String specification = resultSet.getNString("specification");
                String dateTime  = resultSet.getString("dateTime");
                int type = resultSet.getInt("type_id");
                // Tạo đối tượng Product và thêm vào danh sách
                Product product = new Product(id, name, type,description,price,imageUrl,specification,dateTime);
                productList.add(product);
            }

            LOGGER.info("Number of products retrieved: " + productList.size());
        } catch (SQLException e) {
            LOGGER.severe("Error getting products: " + e.getMessage());
        } finally {
            // Đóng tất cả các tài nguyên
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
        ProductDAO dao = new ProductDAO();
        System.out.println(dao.getAllProducts().size());
    }
}
