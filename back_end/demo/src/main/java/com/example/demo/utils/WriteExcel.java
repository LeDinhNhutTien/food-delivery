package com.example.demo.utils;

import com.example.demo.modal.Customer;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class WriteExcel {

    public static Workbook exportDataToExcel(List<Customer> customers) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Customer Info");

        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Username");
        headerRow.createCell(1).setCellValue("Password");
        headerRow.createCell(2).setCellValue("First Name");
        headerRow.createCell(3).setCellValue("Last Name");
        headerRow.createCell(4).setCellValue("Phone");
        headerRow.createCell(5).setCellValue("Address");
        headerRow.createCell(6).setCellValue("Status");

        // Add data of each customer to the Excel file
        int rowNum = 1;
        for (Customer customer : customers) {
            Row dataRow = sheet.createRow(rowNum++);
            dataRow.createCell(0).setCellValue(customer.getUsername());
            dataRow.createCell(1).setCellValue(customer.getPassword());
            dataRow.createCell(2).setCellValue(customer.getFirst_name());
            dataRow.createCell(3).setCellValue(customer.getLast_name());
            dataRow.createCell(4).setCellValue(customer.getPhone());
            dataRow.createCell(5).setCellValue(customer.getAddress());
            dataRow.createCell(6).setCellValue(customer.getStatusToString());
        }

        return workbook;
    }
}
