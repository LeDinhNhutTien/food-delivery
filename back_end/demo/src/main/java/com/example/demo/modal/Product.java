package com.example.demo.modal; // Changed package name to lowercase and corrected typo in 'Modal' to 'modal'

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private int type;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;

    // Change imageUrl to a list of images
    @Column(name = "image_urls")
    private List<String> imageUrls;

    @Column(name = "specification")
    private String specification;

    @Column(name = "date_time")
    private String dateTime;

    // Constructors, getters, setters

    // Default constructor
    public Product() {
    }

    // Parameterized constructor
    public Product(Long id, String name, int type, String description, double price, List<String> imageUrls, String specification, String dateTime) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
        this.imageUrls = imageUrls;
        this.specification = specification;
        this.dateTime = dateTime;
    }

    public Product(Long id, String name, String description, double price, List<String> imageUrls, int type) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
        this.imageUrls = imageUrls;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    // Optional: Override toString() method for debugging purposes
    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", imageUrls='" + imageUrls + '\'' +
                ", specification='" + specification + '\'' +
                ", dateTime='" + dateTime + '\'' +
                '}';
    }
}
