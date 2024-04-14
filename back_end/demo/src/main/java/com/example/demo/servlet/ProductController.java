package com.example.demo.servlet;


import com.example.demo.dao.ProductDAO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.modal.Product;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // Cho phép truy cập từ origin http://localhost:3000
public class ProductController {
    ProductDAO dao = new ProductDAO();
    @GetMapping
    public List<Product> getAllProducts() {
        List<Product> products = dao.getAllProducts(); // Sử dụng ProductService để lấy danh sách sản phẩm
        return products;
    }
}