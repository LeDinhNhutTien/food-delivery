package com.example.demo.repository;

import com.example.demo.modal.Customer;
import com.example.demo.modal.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findById(int id);
    @Query("SELECT DISTINCT p.name FROM Product p WHERE p.name LIKE %:query%")
    List<String> findDistinctProductNamesContaining(@Param("query") String query);


}