package com.example.demo.controller;

import com.example.demo.dao.HistoryDao;
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

    HistoryDao dao =  new HistoryDao();

    @GetMapping
    public List<History> getAllCustomer() throws SQLException {
        List<History> histories = dao.getAllHistory();

        return histories;
    }

    @GetMapping("/getOrder/{id}")
    public ResponseEntity<?> getOrder(@PathVariable String id) throws SQLException {
        int idd = Integer.parseInt(id);
        if ( idd!=0) {
            List<History> histories = dao.getHistoryById(idd);
            return ResponseEntity.ok(histories);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lỗi");
        }
    }
    @GetMapping("/getCustomer/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable String id) throws SQLException {
        int idd = Integer.parseInt(id);
        if ( idd!=0) {
            Customer customer = dao.getCustomerByIdOrder(idd);
            return ResponseEntity.status(HttpStatus.OK).body(customer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lỗi");
        }
    }

    @PostMapping("/updateOrder/{id}")
    public ResponseEntity<String> updateOrder(@PathVariable String id, @RequestBody Map<String, String> requestBody) {
        int orderId = Integer.parseInt(id);
        String state = requestBody.get("state");
        try {
            boolean success = dao.updateHistory(orderId, state);
            if (success) {
                return ResponseEntity.ok("Đã cập nhật đơn hàng thành công");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không thể cập nhật đơn hàng");
            }
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xử lý yêu cầu");
        }
    }

}
