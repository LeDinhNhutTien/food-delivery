package com.example.demo.repository;

import com.example.demo.modal.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByUsernameAndPassword(String username, String password);
    Customer findByUsername(String username);
    boolean existsByUsername(String username);

    Customer findById(int id);
    @Query("SELECT COUNT(c) FROM Customer c WHERE MONTH(c.createDate) = :month")
    Long findNewCustomers(@Param("month") int month);

}
