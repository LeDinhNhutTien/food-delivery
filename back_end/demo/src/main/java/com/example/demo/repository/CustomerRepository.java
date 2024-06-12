package com.example.demo.repository;

import com.example.demo.modal.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByUsername(String username);
    boolean existsByUsername(String username);

    Customer findById(int id);

}
