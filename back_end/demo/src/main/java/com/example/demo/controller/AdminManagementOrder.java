package com.example.demo.controller;

import com.example.demo.dao.HistoryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.modal.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/managementOrderAdmin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminManagementOrder {

    HistoryDao dao =  new HistoryDao();

    @GetMapping
    public List<History> getAllCustomer() throws SQLException {
        List<History> histories = dao.getAllHistory();

        return histories;
    }
}
