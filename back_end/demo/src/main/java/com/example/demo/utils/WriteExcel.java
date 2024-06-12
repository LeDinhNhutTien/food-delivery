package com.example.demo.utils;

import com.example.demo.modal.Customer;

import com.example.demo.modal.RevenueRecord;
import com.example.demo.modal.RevenueRecordMonth;
import org.apache.poi.ss.usermodel.Cell;
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
//        for (Customer customer : customers) {
//            Row dataRow = sheet.createRow(rowNum++);
//            dataRow.createCell(0).setCellValue(customer.getUsername());
//            dataRow.createCell(1).setCellValue(customer.getPassword());
//            dataRow.createCell(2).setCellValue(customer.getFirst_name());
//            dataRow.createCell(3).setCellValue(customer.getLast_name());
//            dataRow.createCell(4).setCellValue(customer.getPhone());
//            dataRow.createCell(5).setCellValue(customer.getAddress());
//            dataRow.createCell(6).setCellValue(customer.getStatusToString());
//        }

        return workbook;
    }
    public static Workbook exportRevenueToExcel(List<RevenueRecord> revenues) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Thống kê doanh thu hàng tháng");

        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Date");
        headerRow.createCell(1).setCellValue("Amount");


        // Add data of each revenue to the Excel file
        int rowNum = 1;
        for (RevenueRecord revenue : revenues) {
            Row dataRow = sheet.createRow(rowNum++);
            Cell dateCell = dataRow.createCell(0);
            dateCell.setCellValue(revenue.getMonth()); // Assuming getDate() returns a Date object
            // Format date if needed
            // SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            // dateCell.setCellValue(dateFormat.format(revenue.getDate()));
            dataRow.createCell(1).setCellValue(revenue.getTotalRevenue());

        }

        return workbook;
    }
    public static Workbook exportRevenueToExcelForMonth(List<RevenueRecordMonth> revenues) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Thống kê doanh thu theo tháng");

        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Ngày");
        headerRow.createCell(1).setCellValue("Doanh thu");


        // Add data of each revenue to the Excel file
        int rowNum = 1;
        for (RevenueRecordMonth revenue : revenues) {
            Row dataRow = sheet.createRow(rowNum++);
            Cell dateCell = dataRow.createCell(0);
            dateCell.setCellValue(revenue.getDay()); // Assuming getDate() returns a Date object

            dataRow.createCell(1).setCellValue(revenue.getTotalRevenue());

        }

        return workbook;
    }

}
