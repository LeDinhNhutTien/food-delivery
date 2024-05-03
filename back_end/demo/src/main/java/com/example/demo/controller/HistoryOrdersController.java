package com.example.demo.controller;

import com.example.demo.dao.HistoryDao;
import com.example.demo.modal.Customer;
import com.example.demo.modal.History;
import com.example.demo.modal.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HistoryOrdersController {
    HistoryDao dao = new HistoryDao();

    @PostMapping("/historyOrders")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> credentials) throws SQLException {
        int id = Integer.parseInt(credentials.get("idUser"));

        if (id != 0) {
            List<History> historys = dao.getAllHistory(id);
            return ResponseEntity.ok(historys);

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không có lịch sử đơn hàng");
        }
    }
}