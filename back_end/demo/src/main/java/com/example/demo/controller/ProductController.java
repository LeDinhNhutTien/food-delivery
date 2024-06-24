package com.example.demo.controller;

import com.example.demo.service.ProductService;
import com.example.demo.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService dao;

    @Autowired
    public ProductController( ProductService dao) {
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
