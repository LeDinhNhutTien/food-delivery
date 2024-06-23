package com.example.demo.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Orders implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderID")
    private Integer orderID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", referencedColumnName = "id_user")
    private Customer customer;

    @Column(name = "CreationDate")
    private LocalDate creationDate;

    @Column(name = "TotalAmount")
    private double totalAmount;

    @Column(name = "OrderStatus")
    private String orderStatus;

    @Column(name = "ShippingAddress")
    private String shippingAddress;

    @Column(name = "PaymentMethod")
    private String paymentMethod;

    @Column(name = "DiscountCode")
    private String discountCode;

    @Column(name = "Note")
    private String note;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<OrderItems> orderItems;

    @Override
    public String toString() {
        return "Orders{" +
                "orderID=" + orderID +
                ", creationDate=" + creationDate +
                ", totalAmount=" + totalAmount +
                ", orderStatus='" + orderStatus + '\'' +
                ", shippingAddress='" + shippingAddress + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", discountCode='" + discountCode + '\'' +
                ", note='" + note + '\'' +
                ", orderItems=" + orderItems +
                '}';
    }
}
