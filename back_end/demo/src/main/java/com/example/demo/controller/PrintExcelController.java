package com.example.demo.controller;

import com.example.demo.dao.AdminManagementCustomerDao;
import com.example.demo.modal.Customer;
import com.example.demo.utils.WriteExcel;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
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


}
