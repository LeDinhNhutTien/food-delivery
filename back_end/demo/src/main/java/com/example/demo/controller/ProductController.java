package com.example.demo.controller;

import com.example.demo.dao.ProductDao;
import com.example.demo.dto.ProductDTO;
import com.example.demo.modal.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductDao dao;

    @Autowired
    public ProductController( ProductDao dao) {
        this.dao = dao;

    }

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return dao.getAllProducts();
    }

    @GetMapping("/detailProduct/{id}")
    public ProductDTO getProductDetail(@PathVariable("id") long id) {
        ProductDTO product = dao.getProductById(id);
        return product;
    }
}
