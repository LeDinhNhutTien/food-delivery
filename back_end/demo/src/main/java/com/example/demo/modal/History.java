package com.example.demo.modal;

public class History {
    int orderID;
    String name;
    String url;
    String date;
    String status;
    double totalPrice;
    int quantity;

    String nameCustomer;
    String address;

    public History(int orderID, String name, String url, String date, String status, double totalPrice, String address) {
        this.orderID = orderID;
        this.name = name;
        this.url = url;
        this.date = date;
        this.status = status;
        this.totalPrice = totalPrice;
        this.quantity = quantity;
        this.address = address;
    }

    public History(int orderID, String name, String url, String date, String status) {
        this.orderID = orderID;
        this.name = name;
        this.url = url;
        this.date = date;
        this.status = status;
    }

    public History(int orderID, String name, String nameCustomer, String date, double totalPrice, String status, String url) {
        this.orderID = orderID;
        this.name = name;
        this.date = date;
        this.status = status;
        this.totalPrice = totalPrice;
        this.nameCustomer = nameCustomer;
        this.url = url;
    }

    public History(String name, String url, double totalPrice, int quantity) {
        this.name = name;
        this.url = url;
        this.totalPrice = totalPrice;
        this.quantity = quantity;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "History{" +
                "orderID=" + orderID +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", date='" + date + '\'' +
                ", status='" + status + '\'' +
                ", totalPrice=" + totalPrice +
                ", quantity=" + quantity +
                '}';
    }
}
