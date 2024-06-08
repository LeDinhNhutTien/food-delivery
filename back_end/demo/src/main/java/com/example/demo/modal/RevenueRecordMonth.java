package com.example.demo.modal;

public class RevenueRecordMonth {

    private int day;
    private double totalRevenue;

    // Constructor
    public RevenueRecordMonth(int day, double totalRevenue) {

        this.day = day;
        this.totalRevenue = totalRevenue;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
