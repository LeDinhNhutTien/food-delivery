package com.example.demo.dto;

public class CustomerDTO {
    private int id_user;
    private String username;
    private String first_name;
    private String last_name;
    private String password;
    private String phone;
    private String address;
    private String role;
    private String createDate;
    private int status;

    public CustomerDTO() {
    }

    public CustomerDTO(int id_user, String username, String first_name, String last_name, String phone, String address, String role, String createDate, int status) {
        this.id_user = id_user;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.createDate = createDate;
        this.status = status;
    }

    public CustomerDTO(Integer idUser, String username, String firstName, String lastName, String password, String phone, String address, String role, String string, int status) {
        this.id_user = idUser;
        this.username = username;
        this.first_name = firstName;
        this.last_name = lastName;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.createDate = string;
        this.status = status;
    }

    public CustomerDTO(String username, String address, String phone) {
        this.username = username;
        this.address = address;
        this.phone = phone;
    }

    // Getters and Setters


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId_user() {
        return id_user;
    }

    public void setId_user(int id_user) {
        this.id_user = id_user;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
