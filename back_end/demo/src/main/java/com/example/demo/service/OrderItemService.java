package com.example.demo.service;

import com.example.demo.modal.OrderItems;
import com.example.demo.modal.Orders;
import com.example.demo.modal.Product;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    public OrderItems insertOrderItem(Integer productId, Integer orderId, Integer quantity, Double price, Double discount) {
        Optional<Product> optionalProduct = Optional.ofNullable(productRepository.findById(productId));
        Optional<Orders> optionalOrder = orderRepository.findById(orderId);

        if (optionalProduct.isEmpty() || optionalOrder.isEmpty()) {
            throw new IllegalArgumentException("Product or Order not found");
        }

        Product product = optionalProduct.get();
        Orders order = optionalOrder.get();

        OrderItems orderItem = new OrderItems();
        orderItem.setProduct(product);
        orderItem.setOrder(order);
        orderItem.setQuantity(quantity);
        orderItem.setPrice(price);
        orderItem.setDiscount(discount);

        return orderItemRepository.save(orderItem);
    }
}
