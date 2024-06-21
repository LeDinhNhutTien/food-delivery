package com.example.demo.controller;

import com.example.demo.service.AdminManagementService;

import com.example.demo.modal.AdminManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/managementAdmin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminManagementController {
    @Autowired
    private AdminManagementService adminManagementService;
    @GetMapping
    public AdminManagement getAllInfor() {
        LocalDate currentDate = LocalDate.now();
        int currentMonth = currentDate.getMonthValue();

        String doanhSoHangThang = adminManagementService.getDoanhSoHangThang(currentMonth).toString();
        String soLuongSanPham = adminManagementService.getSoLuongSanPham(currentMonth).toString();
        String tongDoanhThu = adminManagementService.getTongDoanhThu().toString();
        String nguoiMoi = adminManagementService.getNguoiMoi(currentMonth).toString();

        AdminManagement adminManagement = new AdminManagement(doanhSoHangThang ,nguoiMoi,tongDoanhThu,soLuongSanPham);
        return adminManagement;
    }
}
