package com.example.demo.dto;

import com.example.demo.modal.Images;

import java.util.List;

public class ProductDTO {
    private long id;
    private String name;
    private String description;
    private double price;
    private List<String> imageUrls;
    private String specification;
    private String dateTime;
    private int  typeId;

    public ProductDTO(long id, String name, String description, double price, List<String> imageUrls, String specification, String dateTime, Integer typeId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrls = imageUrls;
        this.specification = specification;
        this.dateTime = dateTime;
        this.typeId = typeId != null ? typeId.intValue() : 1; // Handle null typeId by defaulting to 0
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", imageUrls=" + imageUrls +
                ", specification='" + specification + '\'' +
                ", dateTime='" + dateTime + '\'' +
                ", typeId=" + typeId +
                '}';
    }
}
