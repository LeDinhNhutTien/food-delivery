package com.example.demo.controller;

import com.example.demo.dao.RevenueManagementDao;
import com.example.demo.modal.RevenueRecord;
import com.example.demo.modal.RevenueRecordMonth;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/details/{year}/{month}")
    public List<RevenueRecordMonth> getRevenueRecordsForMonth(@PathVariable int year, @PathVariable int month) throws SQLException {
        List<RevenueRecordMonth> revenueRecords = dao.calculateMonthlyRevenueForMonth(year, month);
        return revenueRecords;
    }
}
