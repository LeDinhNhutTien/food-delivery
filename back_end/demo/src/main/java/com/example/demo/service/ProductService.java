package com.example.demo.service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.modal.Images;
import com.example.demo.modal.Product;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageRepository imageRepository;

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::mapToProductDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::mapToProductDTO)
                .orElse(null);
    }

    public List<String> getSearchSuggestions(String query) {
        return productRepository.findDistinctProductNamesContaining(query);
    }

    @Transactional
    public ProductDTO addProduct(ProductDTO productDTO) {
        Product product = new Product();
        mapToProductEntity(productDTO, product);

        // Save product entity
        Product savedProduct = productRepository.save(product);

        // Save associated images (assuming imageUrls are passed in productDTO)
        if (productDTO.getImageUrls() != null && !productDTO.getImageUrls().isEmpty()) {
            List<Images> images = productDTO.getImageUrls().stream()
                    .map(imageUrl -> new Images(imageUrl, savedProduct))
                    .collect(Collectors.toList());
            imageRepository.saveAll(images);
        }

        // Map and return saved product DTO
        return productDTO;
    }

    private ProductDTO mapToProductDTO(Product product) {
        List<Images> images = imageRepository.findByProductId(product.getId());
        List<String> imageUrls = images.stream()
                .map(Images::getUrl)
                .collect(Collectors.toList());

        int typeId = product.getType() != null ? product.getType().getId() : null; // Handle potential null pointer

        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                imageUrls,
                product.getSpecification(),
                product.getDateTime().toString(),
                typeId
        );
    }

    private void mapToProductEntity(ProductDTO productDTO, Product product) {
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        // Set other attributes as needed
    }

}
