package com.example.demo.controller;

import com.example.demo.dto.ProductDTO;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/managementProductAdmin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminProductController {

    @Autowired
    private ProductService productService;

    // Endpoint to fetch all products
    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    // Endpoint to add a new product
    @PostMapping("/addProduct")
    public ProductDTO addProduct(@RequestBody ProductDTO productDTO) {
        System.out.println(productDTO.toString());
        return productService.addProduct(productDTO);
    }
}
