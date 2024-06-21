package com.example.demo.repository;

import com.example.demo.dto.OrderDTO;
import com.example.demo.modal.History;
import com.example.demo.modal.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface HistoryOrdersRepository extends JpaRepository<Orders, Integer> {
    @Query(value = "SELECT o.OrderID, GROUP_CONCAT(DISTINCT p.name SEPARATOR ', ') AS productNames, " +
            "GROUP_CONCAT(DISTINCT i.url SEPARATOR ', ') AS imageUrls, " +
            "o.Creation_Date, o.Order_Status " +
            "FROM orders o " +
            "JOIN orderitems od ON o.OrderID = od.OrderID " +
            "JOIN products p ON p.id = od.ProductID " +
            "JOIN images i ON i.products_id = p.id " +
            "JOIN customer c ON c.id_user = o.id_user " +
            "WHERE c.id_user = :customerId " +
            "GROUP BY o.OrderID, o.Creation_Date, o.Order_Status", nativeQuery = true)
    List<Object[]> findAllOrdersByCustomerId(@Param("customerId") int customerId);


    @Query(value = "SELECT o.OrderID, " +
            "GROUP_CONCAT(DISTINCT p.`name` SEPARATOR ', ') AS product_names, " +
            "GROUP_CONCAT(DISTINCT selected_images.url SEPARATOR ', ') AS image_urls, " +
            "o.Creation_Date, " +
            "o.Order_Status, " +
            "o.Shipping_Address, " +
            "SUM(od.Price) AS total_price " +
            "FROM orders o " +
            "JOIN orderitems od ON o.OrderID = od.OrderID " +
            "JOIN products p ON p.id = od.ProductID " +
            "JOIN (SELECT products_id, MIN(url) AS url FROM images GROUP BY products_id) AS selected_images " +
            "ON selected_images.products_id = p.id " +
            "JOIN customer c ON c.id_user = o.id_user " +
            "WHERE o.OrderID = :orderID " +
            "GROUP BY o.OrderID, o.Creation_Date, o.Order_Status,o.Shipping_Address", nativeQuery = true)
    List<Object[]> findHistoryById(@Param("orderID") int orderID);


    @Query(value = "SELECT p.`name`, od.Quantity, od.Price, selected_images.url AS image_urls " +
            "FROM orders o " +
            "JOIN orderitems od ON o.OrderID = od.OrderID " +
            "JOIN products p ON p.id = od.ProductID " +
            "JOIN (SELECT products_id, MIN(url) AS url FROM images GROUP BY products_id) AS selected_images " +
            "ON selected_images.products_id = p.id " +
            "WHERE od.OrderID = :orderID ", nativeQuery = true)
    List<Object[]> findHistoryInformationById(@Param("orderID") int orderID);

    @Modifying
    @Transactional
    @Query("UPDATE Orders o SET o.orderStatus = 'Đã hủy' WHERE o.orderID = :orderId")
    int cancel(@Param("orderId") int orderId);

    // manager order admin
    @Query(value = "SELECT o.OrderID, GROUP_CONCAT(DISTINCT p.`name` SEPARATOR ', ') AS products, c.username, " +
            "o.Creation_Date, SUM(od.Price) AS totalPrice, o.Order_Status, " +
            "GROUP_CONCAT(DISTINCT selected_images.url SEPARATOR ', ') AS image_urls, " +
            "o.Shipping_Address " +
            "FROM orders o " +
            "JOIN orderitems od ON o.OrderID = od.OrderID " +
            "JOIN products p ON p.id = od.ProductID " +
            "JOIN (SELECT products_id, MIN(url) AS url FROM images GROUP BY products_id) AS selected_images " +
            "ON selected_images.products_id = p.id " +
            "JOIN customer c ON c.id_user = o.id_user " +
            "GROUP BY o.OrderID, c.username, o.Creation_Date, o.Order_Status, o.Shipping_Address", nativeQuery = true)
    List<Object[]> findAllOrdersAdmin();

    @Query(value = "SELECT c.username, c.address, c.phone " +
            "FROM orders o " +
            "JOIN customer c ON c.id_user = o.id_user " +
            "WHERE o.OrderID = ?", nativeQuery = true)
    List<Object[]> findCustomerById(@Param("orderID") int orderID);

    @Modifying
    @Transactional
    @Query("UPDATE Orders o SET o.orderStatus = :state WHERE o.orderID = :orderId")
    int update(@Param("orderId") int orderId, @Param("state") String state);
}

