package com.example.demo.service;

import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AdminManagementService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public BigDecimal getDoanhSoHangThang(int thang) {
        return orderRepository.findMonthlyRevenue(thang);
    }

    public Long getSoLuongSanPham(int thang) {
        return orderRepository.findMonthlyProductQuantity(thang);
    }

    public BigDecimal getTongDoanhThu() {
        return orderRepository.findTotalRevenue();
    }

    public Long getNguoiMoi(int thang) {
        return customerRepository.findNewCustomers(thang);
    }
}
