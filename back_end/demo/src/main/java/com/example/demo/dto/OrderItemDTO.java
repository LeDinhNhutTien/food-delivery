package com.example.demo.dto;

import com.example.demo.modal.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class OrderItemDTO {

    private int orderItemID;
    private int orderId;
    private int productId;
    private int quantity;
    private double price;
    private double discount;

    // Constructor to convert from OrderItems entity
    public OrderItemDTO(int orderItemID, int orderId, int productId, int quantity, double price, double discount) {
        this.orderItemID = orderItemID;
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
    }

    public int getOrderItemID() {
        return orderItemID;
    }

    public void setOrderItemID(int orderItemID) {
        this.orderItemID = orderItemID;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
