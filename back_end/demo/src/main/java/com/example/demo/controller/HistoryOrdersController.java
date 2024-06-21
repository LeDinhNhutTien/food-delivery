package com.example.demo.controller;


import com.example.demo.dto.OrderDTO;
import com.example.demo.modal.*;
import com.example.demo.service.HistoryOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
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

    private final HistoryOrdersService historyOrdersService;

    @Autowired
    public HistoryOrdersController(HistoryOrdersService historyOrdersService) {
        this.historyOrdersService = historyOrdersService;
    }

    @GetMapping("/historyOrders")
    public ResponseEntity<?> historyOrder(@RequestParam(value = "id_user") int id) throws SQLException {

        if (id != 0) {
            List<OrderDTO> orders = historyOrdersService.getAllOrdersByCustomerId(id);
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không có lịch sử đơn hàng");
        }
    }

    @GetMapping("/orderDetail/{id}")
    public ResponseEntity<?> orderDetail(@PathVariable String id) throws SQLException {
        int idd = Integer.parseInt(id);
        if ( idd!=0) {
            List<OrderDTO> history = historyOrdersService.getHistoryById(Integer.parseInt(id));
            return ResponseEntity.status(HttpStatus.OK).body(history);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tài khoản chưa tồn tại");
        }
    }

    @GetMapping("/orderDetailInfo/{id}")
    public ResponseEntity<?> orderDetailInfo(@PathVariable String id) throws SQLException {
        int idd = Integer.parseInt(id);
        if ( idd!=0) {
            List<OrderDTO> history = historyOrdersService.getHistoryInformationById(Integer.parseInt(id));
            return ResponseEntity.status(HttpStatus.OK).body(history);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tài khoản chưa tồn tại");
        }
    }
    // Thêm một endpoint mới để xử lý yêu cầu cập nhật tình trạng đơn hàng
    @PostMapping("/cancelOrder/{id}")
    public ResponseEntity<String> cancelOrder(@PathVariable String id) {
        int idd = Integer.parseInt(id);
        boolean success = historyOrdersService.cancelOrder(idd);
        if (success) {
            return ResponseEntity.ok("Đã hủy đơn hàng thành công");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không thể hủy đơn hàng");
        }
    }

}