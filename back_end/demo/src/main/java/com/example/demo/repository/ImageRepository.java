package com.example.demo.repository;

import com.example.demo.modal.Images;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Images, Long> {
    List<Images> findByProductId(Long productId);
}
