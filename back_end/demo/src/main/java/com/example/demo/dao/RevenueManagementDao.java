package com.example.demo.dao;

import com.example.demo.modal.RevenueRecord;
import com.example.demo.modal.RevenueRecordMonth;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RevenueManagementDao {

    private final OrderRepository orderRepository;

    @Autowired
    public RevenueManagementDao(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<RevenueRecord> calculateMonthlyRevenue(int yearChosen) {
        return orderRepository.calculateMonthlyRevenue(yearChosen);
    }

    public List<RevenueRecordMonth> calculateMonthlyRevenueForMonth(int month, int year) {
        return orderRepository.calculateMonthlyRevenueForMonth(year, month);
    }
}
