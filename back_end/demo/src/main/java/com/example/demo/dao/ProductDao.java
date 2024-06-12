package com.example.demo.dao;

import com.example.demo.modal.Images;
import com.example.demo.modal.Product;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductDao {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageRepository imageRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<String> getSearchSuggestions(String query) {
        List<String> suggestions = productRepository.findDistinctByNameContaining(query);

        return suggestions;
    }


    public List<Product> getProductById(long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            List<Images> images = imageRepository.findByProductId(id);
            List<String> imageUrls = images.stream().map(Images::getUrl).collect(Collectors.toList());
            product.getImageUrls(imageUrls);
            return List.of(product);
        }
        return List.of();
    }
}
