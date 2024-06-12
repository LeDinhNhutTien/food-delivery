package com.example.demo.modal;

import com.example.demo.modal.OrderItems;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

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
    private int orderID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private Customer customer;

    @Column(name = "CreationDate")
    private LocalDate creationDate;

    @Column(name = "TotalAmount")
    private String totalAmount;

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

    @OneToOne(mappedBy = "order", fetch = FetchType.LAZY)
    private OrderItems orderItem;

}
