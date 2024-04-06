package com.example.demo;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    public List<Product> getAllProducts() {
        // Lấy danh sách sản phẩm từ cơ sở dữ liệu hoặc từ nguồn dữ liệu khác
        List<Product> products = ProductService.getAllProducts();
        return products;
    }
}

