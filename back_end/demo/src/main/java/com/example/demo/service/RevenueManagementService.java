package com.example.demo.service;

import com.example.demo.modal.RevenueRecord;
import com.example.demo.modal.RevenueRecordMonth;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RevenueManagementService {

    private final OrderRepository orderRepository;

    @Autowired
    public RevenueManagementService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<RevenueRecord> calculateMonthlyRevenue(int yearChosen) {
        return orderRepository.calculateMonthlyRevenue(yearChosen);
    }

    public List<RevenueRecordMonth> calculateMonthlyRevenueForMonth(int month, int year) {
        return orderRepository.calculateMonthlyRevenueForMonth(year, month);
    }
}
