package com.example.demo.repository;

import com.example.demo.modal.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Customer findByUsernameAndPassword(String username, String password);
    Customer findByUsername(String username);
    boolean existsByUsername(String username);

    Customer findById(int id);
    @Query("SELECT COUNT(c) FROM Customer c WHERE MONTH(c.createDate) = :month")
    Long findNewCustomers(@Param("month") int month);

    @Modifying
    @Transactional
    @Query("UPDATE Customer c SET c.password = :newPassword WHERE c.username = :username")
    int updatePassword(@Param("username") String username, @Param("newPassword") String newPassword);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END FROM Customer c WHERE c.username = :username AND c.password = :password")
    boolean checkPass(@Param("username") String username, @Param("password") String password);
}