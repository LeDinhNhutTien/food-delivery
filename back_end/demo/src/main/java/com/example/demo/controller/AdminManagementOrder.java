package com.example.demo.controller;


import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.OrderDTO;
import com.example.demo.service.HistoryOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.modal.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/managementOrderAdmin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminManagementOrder {
    @Autowired
    HistoryOrdersService service;


    @GetMapping
    public List<OrderDTO> getAllHistory() throws SQLException {
        List<OrderDTO> histories = service.getAllOrdersAdmin();

        return histories;
    }

    @GetMapping("/getOrder/{id}")
    public ResponseEntity<?> getOrder(@PathVariable String id) throws SQLException {
        int idd = Integer.parseInt(id);
        if ( idd!=0) {
            List<OrderDTO> histories = service.getHistoryById(idd);
            return ResponseEntity.ok(histories);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lỗi");
        }
    }
    @GetMapping("/orderDetailInfo/{id}")
    public ResponseEntity<?> orderDetailInfo(@PathVariable String id) throws SQLException {
        int idd = Integer.parseInt(id);
        if ( idd!=0) {
            List<OrderDTO> history = service.getHistoryInformationById(Integer.parseInt(id));
            return ResponseEntity.status(HttpStatus.OK).body(history);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tài khoản chưa tồn tại");
        }
    }

    @GetMapping("/getCustomer/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable String id) throws SQLException {
        int idd = Integer.parseInt(id);
        if ( idd!=0) {
            CustomerDTO customer = service.getCustomer(idd);
            return ResponseEntity.status(HttpStatus.OK).body(customer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lỗi");
        }
    }

    @PostMapping("/updateOrder/{id}")
    public ResponseEntity<String> updateOrder(@PathVariable String id, @RequestBody Map<String, String> requestBody) {
        int orderId = Integer.parseInt(id);
        String state = requestBody.get("state");
        boolean success = service.updateHistory(orderId, state);
        if (success) {
            return ResponseEntity.ok("Đã cập nhật đơn hàng thành công");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không thể cập nhật đơn hàng");
        }
    }

}
