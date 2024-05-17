package com.example.demo.service;


import org.springframework.stereotype.Service;
import com.example.demo.modal.Product;
import java.util.ArrayList;
import java.util.List;

// Service để truy vấn và xử lý dữ liệu sản phẩm
@Service
public class ProductService {

    public static List<Product> getAllProducts() {

        List<Product> products = new ArrayList<>();

        return products;
    }
}