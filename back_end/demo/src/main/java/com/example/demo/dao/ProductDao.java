package com.example.demo.dao;

import com.example.demo.dto.ProductDTO;
import com.example.demo.modal.Images;
import com.example.demo.modal.Product;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductDao {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageRepository imageRepository;

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> {
            List<Images> images = imageRepository.findByProductId(product.getId());
            List<String> imageUrls = images.stream().map(Images::getUrl).collect(Collectors.toList());
            return new ProductDTO(
                    product.getId(),
                    product.getName(),
                    product.getDescription(),
                    product.getPrice(),
                    imageUrls,
                    product.getSpecification(),
                    product.getDateTime(),
                    product.getType() != null ? product.getType().getId() : null
            );
        }).collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id).map(product -> {
            List<Images> images = imageRepository.findByProductId(product.getId());
            List<String> imageUrls = images.stream().map(Images::getUrl).collect(Collectors.toList());
            return new ProductDTO(
                    product.getId(),
                    product.getName(),
                    product.getDescription(),
                    product.getPrice(),
                    imageUrls,
                    product.getSpecification(),
                    product.getDateTime(),
                    product.getType() != null ? product.getType().getId() : null
            );
        }).orElse(null);
    }


    public List<String> getSearchSuggestions(String query) {
        List<String> suggestions = productRepository.findDistinctProductNamesContaining(query);

        return suggestions;
    }



}
