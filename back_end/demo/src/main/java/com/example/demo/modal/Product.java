package com.example.demo.modal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // Ensure this matches your actual column name in the database
    private Long id; // Ensure this matches your entity's property name

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;

    @Column(name = "specification")
    private String specification;

    @Column(name = "dateTime")
    private LocalDateTime dateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id")
    private TypeOfProduct type;

    @Transient
    private List<String> imageUrls;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<Images> images;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<OrderItems> orderItems;

    // Constructors, getters, setters, toString() omitted for brevity
}
