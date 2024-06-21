package com.example.demo.service;

import com.example.demo.modal.OrderItems;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    public OrderItems insertOrderItem(Integer productId, Integer orderId, Integer quantity, Double price, Double discount) {
        OrderItems orderItem = new OrderItems();
        orderItem.setProduct(productRepository.findById(productId));
        orderItem.setOrder(orderRepository.findById(Long.valueOf(orderId)));
        orderItem.setQuantity(quantity);
        orderItem.setPrice(price);
        orderItem.setDiscount(discount);
        return orderItemRepository.save(orderItem);
    }

}
