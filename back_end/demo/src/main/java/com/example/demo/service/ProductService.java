package com.example.demo.service;


import org.springframework.stereotype.Service;
import com.example.demo.modal.Product;
import java.util.ArrayList;
import java.util.List;

// Service để truy vấn và xử lý dữ liệu sản phẩm
@Service
public class ProductService {

    public static List<Product> getAllProducts() {
        // Truy vấn cơ sở dữ liệu hoặc lấy dữ liệu từ nguồn dữ liệu khác
        List<Product> products = new ArrayList<>();

        return products;
    }
}