package com.example.demo.dao;

import com.example.demo.modal.History;
import com.example.demo.modal.Product;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class HistoryDao {

    public List<History> getAllHistory(int id) throws SQLException {
        Connection connection = null;
        ResultSet resultSet = null;
        List<History> historyList = new ArrayList<>();

        String query = "SELECT o.OrderID, p.`name`, i.url, o.CreationDate, o.OrderStatus\n" +
                "FROM orders o JOIN orderitems od ON \n" +
                "o.OrderID = od.OrderID JOIN products p \n" +
                "ON p.id = od.ProductID JOIN images i\n" +
                "ON i.products_id = p.id JOIN customer c\n" +
                "ON c.id_user = o.UserID\n" +
                "WHERE c.id_user = ?";
        try {
            // Connect to the database
            connection = com.example.demo.dao.DatabaseConnectionTest.getConnection();
            PreparedStatement ps = connection.prepareStatement(query);

            ps.setInt(1, id);

            resultSet = ps.executeQuery(query);

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

        }catch (Exception ex){
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
            }
        }

        return historyList;
    }
}
