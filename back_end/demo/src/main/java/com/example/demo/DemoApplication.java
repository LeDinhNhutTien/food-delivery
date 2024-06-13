package com.example.demo;

import com.example.demo.modal.RevenueRecord;
import com.example.demo.repository.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class DemoApplication {

    private final OrderRepository orderRepository;

    public DemoApplication(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo() {
        return (args) -> {
            int year = 2024; // Specify the year you want to test
            List<RevenueRecord> revenueRecords = orderRepository.calculateMonthlyRevenue(year);

            System.out.println("Monthly Revenue for the year " + year + ":");
            for (int month = 1; month <= 12; month++) {
                int finalMonth = month;
                RevenueRecord record = revenueRecords.stream()
                        .filter(r -> r.getMonth() == finalMonth)
                        .findFirst()
                        .orElse(new RevenueRecord(month, 0));
                System.out.println("Month: " + record.getMonth() + ", Revenue: " + record.getTotalRevenue());
            }
        };
    }
}
