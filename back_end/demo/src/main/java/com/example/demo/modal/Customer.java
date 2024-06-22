package com.example.demo.modal;

import com.example.demo.modal.Orders;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "customer")
public class Customer implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Integer id_user;

    @NotBlank(message = "Username không được để trống")
    @Column(name = "username")
    private String username;

    @NotBlank(message = "Password không được để trống")
    @Column(name = "password")
    private String password;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "role")
    private String role;

    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "status")
    private int status;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
    private List<Orders> orders;


    @PrePersist
    protected void onCreate() {
        if (this.createDate == null) {
            this.createDate = LocalDate.now();
        }
    }
    public Customer(Integer id_user, String username, String password, String first_name, String last_name, String phone, String address, String role) {
        this.id_user = id_user;
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.address = address;
        this.role = role;
    }

    public Customer(String username, String phone, String address) {
    }

    public Customer(String username, String password, String role, int status) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.status = status;
    }

    public Customer(int id, String email, String password, String firtName, String lastName, String phone, String address, String role, String date, int status) {
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id_user=" + id_user +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", role='" + role + '\'' +
                ", createDate=" + createDate +
                ", status=" + status +

                '}';
    }
}
