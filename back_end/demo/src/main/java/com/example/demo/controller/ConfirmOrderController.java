package com.example.demo.controller;

import com.example.demo.dao.OrderDao;
import com.example.demo.modal.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfirmOrderController {

    private final OrderDao orderDao;

    @Autowired
    public ConfirmOrderController(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    @PostMapping("/api/confirmOrder")
    public ResponseEntity<String> confirmOrder(@RequestBody OrderRequest request) {
        try {
            orderDao.insert(request);
            return new ResponseEntity<>("Order confirmed successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error confirming order: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
