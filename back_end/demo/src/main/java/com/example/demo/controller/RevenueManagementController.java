package com.example.demo.controller;

import com.example.demo.dao.RevenueManagementDao;
import com.example.demo.modal.RevenueRecord;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/revenue")
@CrossOrigin(origins = "http://localhost:3000")
public class RevenueManagementController {
    RevenueManagementDao dao = new RevenueManagementDao();

    @GetMapping
    public List<RevenueRecord> getRevenueRecords(@RequestParam int year) throws SQLException {
        List<RevenueRecord> revenueRecords = dao.calculateMonthlyRevenue(year);
        return revenueRecords;
    }

}
