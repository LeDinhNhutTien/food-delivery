package com.example.demo.controller;

import com.example.demo.service.RevenueManagementService;
import com.example.demo.modal.RevenueRecord;
import com.example.demo.modal.RevenueRecordMonth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/revenue")
@CrossOrigin(origins = "http://localhost:3000")
public class RevenueManagementController {

    private final RevenueManagementService dao;

    @Autowired
    public RevenueManagementController(RevenueManagementService dao) {
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
