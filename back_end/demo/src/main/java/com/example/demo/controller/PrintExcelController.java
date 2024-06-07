package com.example.demo.controller;

import com.example.demo.dao.AdminManagementCustomerDao;
import com.example.demo.dao.RevenueManagementDao;
import com.example.demo.modal.Customer;
import com.example.demo.modal.RevenueRecord;
import com.example.demo.utils.WriteExcel;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/printCustomer")
@CrossOrigin(origins = "http://localhost:3000")
public class PrintExcelController {

    @GetMapping("/excel")
    public void exportToExcel(HttpServletResponse response) throws IOException {
        AdminManagementCustomerDao adminManagementCustomerDao = new AdminManagementCustomerDao();
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment; filename=customers.xlsx");

        // Fetch data from database
        List<Customer> customers = adminManagementCustomerDao.getAllCustomer(); // Implement this method in your DAO

        // Create Excel workbook and write data
        Workbook workbook = WriteExcel.exportDataToExcel(customers);

        // Write Excel data to response output stream
        workbook.write(response.getOutputStream());
        workbook.close();
    }
    @GetMapping("/excelRevenue")
    public void exportToExcelRevengue(HttpServletResponse response, @RequestParam int year) throws IOException, SQLException {
        // Tạo một đối tượng RevenueManagementDao và gọi phương thức để lấy danh sách doanh thu cho năm cụ thể
        RevenueManagementDao revenueManagementDao = new RevenueManagementDao();
        List<RevenueRecord> revenueRecords = revenueManagementDao.calculateMonthlyRevenue(year);

        // Thiết lập loại nội dung và tiêu đề phản hồi
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment; filename=revenue_report_" + year + ".xlsx");

        // Tạo workbook Excel từ danh sách doanh thu và ghi dữ liệu vào luồng đầu ra của phản hồi
        Workbook workbook = WriteExcel.exportRevenueToExcel(revenueRecords);
        workbook.write(response.getOutputStream());
        workbook.close();
    }



}
