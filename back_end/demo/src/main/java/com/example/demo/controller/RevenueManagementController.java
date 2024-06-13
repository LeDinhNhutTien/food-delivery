package com.example.demo.controller;

import com.example.demo.dao.RevenueManagementDao;
import com.example.demo.modal.RevenueRecord;
import com.example.demo.modal.RevenueRecordMonth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/revenue")
@CrossOrigin(origins = "http://localhost:3000")
public class RevenueManagementController {

    private final RevenueManagementDao dao;

    @Autowired
    public RevenueManagementController(RevenueManagementDao dao) {
        this.dao = dao;
    }

    @GetMapping
    public List<RevenueRecord> getRevenueRecords(@RequestParam int year) {
        List<RevenueRecord> revenueRecords = dao.calculateMonthlyRevenue(year);
        return revenueRecords;
    }

    @GetMapping("/details/{year}/{month}")
    public List<RevenueRecordMonth> getRevenueRecordsForMonth(@PathVariable int year, @PathVariable int month) {
        List<RevenueRecordMonth> revenueRecords = dao.calculateMonthlyRevenueForMonth(year, month);
        return revenueRecords;
    }
}
