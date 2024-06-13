package com.example.demo.modal;

public class RevenueRecord {
    private int month;
    private double totalRevenue;

    // Constructor must match the query
    public RevenueRecord(int month, double totalRevenue) {
        this.month = month;
        this.totalRevenue = totalRevenue;
    }

    public int getMonth() {
        return month;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    @Override
    public String toString() {
        return "RevenueRecord{" +
                "month=" + month +
                ", totalRevenue=" + totalRevenue +
                '}';
    }
}
