package com.example.demo.modal;

public class RevenueRecord {

        private int year;
        private int month;
        private double totalRevenue;

        // Constructor
        public RevenueRecord(int year, int month, double totalRevenue) {
            this.year = year;
            this.month = month;
            this.totalRevenue = totalRevenue;
        }

        // Getters and Setters
        public int getYear() {
            return year;
        }

        public void setYear(int year) {
            this.year = year;
        }

        public int getMonth() {
            return month;
        }

        public void setMonth(int month) {
            this.month = month;
        }

        public double getTotalRevenue() {
            return totalRevenue;
        }

        public void setTotalRevenue(double totalRevenue) {
            this.totalRevenue = totalRevenue;
        }

        // ToString method
        @Override
        public String toString() {
            return "RevenueRecord{" +
                    "year=" + year +
                    ", month=" + month +
                    ", totalRevenue=" + totalRevenue +
                    '}';
        }
}
