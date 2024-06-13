package com.example.demo.controller;

import com.example.demo.dao.AdminManagementDao;

import com.example.demo.modal.AdminManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/managementAdmin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminManagementController {
    @Autowired
    private AdminManagementDao adminManagementDao;
    @GetMapping
    public AdminManagement getAllInfor() {
        LocalDate currentDate = LocalDate.now();
        int currentMonth = currentDate.getMonthValue();

        String doanhSoHangThang = adminManagementDao.getDoanhSoHangThang(currentMonth).toString();
        String soLuongSanPham = adminManagementDao.getSoLuongSanPham(currentMonth).toString();
        String tongDoanhThu = adminManagementDao.getTongDoanhThu().toString();
        String nguoiMoi = adminManagementDao.getNguoiMoi(currentMonth).toString();

        AdminManagement adminManagement = new AdminManagement(doanhSoHangThang ,nguoiMoi,tongDoanhThu,soLuongSanPham);
        return adminManagement;
    }
}
