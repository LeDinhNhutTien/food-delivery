package com.example.demo.controller;

import com.example.demo.dao.AdminManagementCustomerDao;
import com.example.demo.dao.RevenueManagementDao;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.modal.Customer;
import com.example.demo.modal.RevenueRecord;
import com.example.demo.modal.RevenueRecordMonth;
import com.example.demo.utils.WriteExcel;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/printCustomer")
@CrossOrigin(origins = "http://localhost:3000")
public class PrintExcelController {
    @Autowired
    private AdminManagementCustomerDao dao;
    private final RevenueManagementDao dao2;

    public PrintExcelController(RevenueManagementDao dao2) {
        this.dao2 = dao2;
    }

    @GetMapping("/excel")
    public void exportToExcel(HttpServletResponse response) throws IOException {

        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment; filename=customers.xlsx");
        List<CustomerDTO> customers = dao.getAllCustomers(); // Implement this method in your DAO
        Workbook workbook = WriteExcel.exportDataToExcel(customers);

        // Write Excel data to response output stream
        workbook.write(response.getOutputStream());
        workbook.close();
    }
    @GetMapping("/excelRevenue")
    public void exportToExcelRevengue(HttpServletResponse response, @RequestParam int year) throws IOException, SQLException {
        // Tạo một đối tượng RevenueManagementDao và gọi phương thức để lấy danh sách doanh thu cho năm cụ thể

        List<RevenueRecord> revenueRecords = dao2.calculateMonthlyRevenue(year);

        // Thiết lập loại nội dung và tiêu đề phản hồi
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment; filename=revenue_report_" + year + ".xlsx");

        // Tạo workbook Excel từ danh sách doanh thu và ghi dữ liệu vào luồng đầu ra của phản hồi
        Workbook workbook = WriteExcel.exportRevenueToExcel(revenueRecords);
        workbook.write(response.getOutputStream());
        workbook.close();
    }
    @GetMapping("/excelRevenueMonth")
    public void exportToExcelRevenueMonth(HttpServletResponse response, @RequestParam int year, @RequestParam int month) throws IOException, SQLException {
        try {
            // Get revenue data for the specific year and month

            List<RevenueRecordMonth> revenueRecordMonths = dao2.calculateMonthlyRevenueForMonth(year, month);

            // Set response content type and header
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=revenue_report_" + year + "_" + month + ".xlsx");

            // Create Excel workbook from revenue data and write data to the response output stream
            Workbook workbook = WriteExcel.exportRevenueToExcelForMonth(revenueRecordMonths);
            workbook.write(response.getOutputStream());
            workbook.close();
        } catch (Exception e) {
            // Handle any exceptions and return appropriate response
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("An error occurred: " + e.getMessage());
        }
    }


}
