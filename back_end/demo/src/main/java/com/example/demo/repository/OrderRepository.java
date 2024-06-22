package com.example.demo.repository;

import com.example.demo.modal.Orders;
import com.example.demo.modal.RevenueRecord;
import com.example.demo.modal.RevenueRecordMonth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {

    @Query("SELECT SUM(o.totalAmount) FROM Orders o WHERE MONTH(o.creationDate) = :month")
    BigDecimal findMonthlyRevenue(@Param("month") int month);

    @Query("SELECT SUM(oi.quantity) FROM OrderItems oi JOIN oi.order o WHERE MONTH(o.creationDate) = :month")
    Long findMonthlyProductQuantity(@Param("month") int month);

    @Query("SELECT SUM(o.totalAmount) FROM Orders o")
    BigDecimal findTotalRevenue();

    @Query("SELECT new com.example.demo.modal.RevenueRecord(MONTH(o.creationDate), COALESCE(SUM(o.totalAmount), 0)) " +
            "FROM Orders o WHERE YEAR(o.creationDate) = :year GROUP BY MONTH(o.creationDate) ORDER BY MONTH(o.creationDate)")
    List<RevenueRecord> calculateMonthlyRevenue(@Param("year") int year);

    @Query("SELECT new com.example.demo.modal.RevenueRecordMonth(DAY(o.creationDate), COALESCE(SUM(o.totalAmount), 0)) " +
            "FROM Orders o WHERE YEAR(o.creationDate) = :year AND MONTH(o.creationDate) = :month " +
            "GROUP BY DAY(o.creationDate) ORDER BY DAY(o.creationDate)")
    List<RevenueRecordMonth> calculateMonthlyRevenueForMonth(@Param("year") int year, @Param("month") int month);

    Optional<Orders> findById(Integer orderId);
}
