package com.example.demo.controller;


import com.example.demo.dao.ProductDAO;
import com.example.demo.modal.History;
import com.example.demo.modal.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.sql.SQLException;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/detailProduct/{id}")
    public ResponseEntity<?> getProductDetail(@PathVariable("id") long id) throws SQLException {
        List<Product> product = dao.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy sản phẩm");
        }
    }
}