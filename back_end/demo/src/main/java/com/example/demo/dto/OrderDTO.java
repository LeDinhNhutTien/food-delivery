package com.example.demo.dto;

import com.example.demo.modal.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
//@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Integer orderID;
    private LocalDate creationDate;
    private String orderStatus;
    private String productName;
    private String imageUrl;

    private Customer customer;
    private int totalAmount;
    private double price;
    private String shippingAddress;
    private String paymentMethod;
    private String discountCode;
    private String note;
    private List<OrderItemDTO> orderItems;
    private String customerName;

    // Constructors if needed

    public OrderDTO(Integer orderID, LocalDate creationDate, String orderStatus, String productName, String imageUrl) {
        this.orderID = orderID;
        this.creationDate = creationDate;
        this.orderStatus = orderStatus;
        this.productName = productName;
        this.imageUrl = imageUrl;
    }

    public OrderDTO(Integer orderID, LocalDate creationDate, String orderStatus, String productName, String imageUrl, double price, String shippingAddress) {
        this.orderID = orderID;
        this.creationDate = creationDate;
        this.orderStatus = orderStatus;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.price = price;
        this.shippingAddress = shippingAddress;
    }
    public OrderDTO(Integer orderID, LocalDate creationDate, String orderStatus, String productName, String imageUrl, double price, String customerName, String shippingAddress) {
        this.orderID = orderID;
        this.creationDate = creationDate;
        this.orderStatus = orderStatus;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.price = price;
        this.customerName = customerName;
        this.shippingAddress = shippingAddress;
    }
    public OrderDTO(String productName, int totalAmount, double price, String imageUrl) {
        this.productName = productName;
        this.totalAmount = totalAmount;
        this.price = price;
        this.imageUrl = imageUrl;
    }


    public Integer getOrderID() {
        return orderID;
    }

    public void setOrderID(Integer orderID) {
        this.orderID = orderID;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


}
