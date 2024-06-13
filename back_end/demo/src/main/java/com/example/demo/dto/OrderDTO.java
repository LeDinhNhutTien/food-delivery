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
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private int orderID;
    private Customer customer;
    private LocalDate creationDate;
    private int totalAmount;
    private String orderStatus;
    private String shippingAddress;
    private String paymentMethod;
    private String discountCode;
    private String note;
    private List<OrderItemDTO> orderItems; // Assuming you have an OrderItemDTO

    // Constructors if needed
}
