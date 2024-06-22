package com.example.demo.service;

import com.example.demo.modal.CartItem;

import com.example.demo.modal.OrderItems;
import com.example.demo.modal.OrderRequest;
import com.example.demo.modal.Orders;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.logging.Logger;

@Repository
public class OrderService {

    private static final Logger LOGGER = Logger.getLogger(OrderService.class.getName());

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public Integer insert(OrderRequest orderRequest) {
        try {
            Orders order = new Orders();
            order.setCustomer(customerRepository.findById(orderRequest.getUserId()));
            order.setCreationDate(LocalDate.from(LocalDateTime.now()));
            order.setTotalAmount(orderRequest.getShippingInfo().getTotalPrice());
            order.setOrderStatus("Chờ xử lý");
            order.setShippingAddress(orderRequest.getShippingInfo().getAddress() + ", " +
                    orderRequest.getShippingInfo().getDistrict() + ", " +
                    orderRequest.getShippingInfo().getWard() + ", " +
                    orderRequest.getShippingInfo().getProvince());
            order.setPaymentMethod(orderRequest.getShippingInfo().getPaymentMethod());
            order.setDiscountCode("");
            order.setNote(orderRequest.getShippingInfo().getNote());

            Orders savedOrder = orderRepository.save(order);


            for (CartItem orderItem : orderRequest.getStoredCartItems()) {
                OrderItems item = new OrderItems();
                item.setOrder(savedOrder);
                item.setProduct(productRepository.findById(orderItem.getId()));
                item.setQuantity(orderItem.getQuantity());
                item.setPrice(orderItem.getPrice());
                item.setDiscount(0.0);

                orderItemRepository.save(item);
            }

            return savedOrder.getOrderID();
        } catch (Exception e) {
            LOGGER.severe("Error inserting order: " + e.getMessage());
            throw e;
        }
    }

}
