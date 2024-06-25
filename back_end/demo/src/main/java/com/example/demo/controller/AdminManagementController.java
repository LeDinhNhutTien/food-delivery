package com.example.demo.controller;

import com.example.demo.modal.AdminManagement;
import com.example.demo.service.AdminManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/admin/managementAdmin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminManagementController {
    @Autowired
    private AdminManagementService adminManagementService;

    @GetMapping
    public AdminManagement getAllInfor() {
        LocalDate currentDate = LocalDate.now();
        int currentMonth = currentDate.getMonthValue();

        // Lấy các giá trị từ service
        BigDecimal doanhSoHangThang = adminManagementService.getDoanhSoHangThang(currentMonth);
        int soLuongSanPham = Math.toIntExact(adminManagementService.getSoLuongSanPham(currentMonth));
        BigDecimal tongDoanhThu = adminManagementService.getTongDoanhThu();
        int nguoiMoi = Math.toIntExact(adminManagementService.getNguoiMoi(currentMonth));

        // Định dạng các giá trị để giới hạn 2 chữ số thập phân
        String formattedDoanhSoHangThang = formatDecimal(doanhSoHangThang);
        String formattedTongDoanhThu = formatDecimal(tongDoanhThu);

        // Tạo đối tượng AdminManagement với các giá trị đã định dạng
        AdminManagement adminManagement = new AdminManagement(formattedDoanhSoHangThang,
                String.valueOf(nguoiMoi), formattedTongDoanhThu, String.valueOf(soLuongSanPham));

        return adminManagement;
    }

    // Phương thức để định dạng số thập phân với 2 chữ số sau dấu phẩy
    private String formatDecimal(BigDecimal value) {
        DecimalFormat df = new DecimalFormat("#.##");
        return df.format(value);
    }
}
