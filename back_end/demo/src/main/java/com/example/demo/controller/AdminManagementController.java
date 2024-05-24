package com.example.demo.controller;

import com.example.demo.dao.AdminManagementDao;

import com.example.demo.modal.AdminManagement;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/managementAdmin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminManagementController {
    AdminManagementDao dao = new AdminManagementDao();

    @GetMapping
    public AdminManagement getAllInfor() {
        LocalDate currentDate = LocalDate.now();
        int currentMonth = currentDate.getMonthValue();
        AdminManagement adminManagement = new AdminManagement(dao.getDoanhSoHangThang(currentMonth),dao.getNguoiMoi(currentMonth),dao.getTongDoanhThu(),dao.getSoLuongSanPham(currentMonth));
        return adminManagement;
    }
}
