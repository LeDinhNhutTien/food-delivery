package com.example.demo.modal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "orderitems")
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderItemID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductID") // Ensure this matches the column name in the 'products' table
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OrderID")
    private Orders order;

    @Column(name = "Quantity")
    private int quantity;

    @Column(name = "Price")
    private double price;

    @Column(name = "Discount")
    private double discount;

    // Constructors, getters, setters, toString() omitted for brevity
}
