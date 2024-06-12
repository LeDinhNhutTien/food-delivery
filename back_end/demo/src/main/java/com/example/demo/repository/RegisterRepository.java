package com.example.demo.repository;

import com.example.demo.modal.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterRepository extends JpaRepository<Customer, Integer> {
    boolean existsByUsername(String username);
}
