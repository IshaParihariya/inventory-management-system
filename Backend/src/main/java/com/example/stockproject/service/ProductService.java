package com.example.stockproject.service;

import com.example.stockproject.model.Product;
import com.example.stockproject.repo.ProductRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ProductService {

    private final ProductRepo productRepo;

    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public Product addProduct(Product product) {
        System.out.println("Product received: " + product.getName());

        Product savedProduct = productRepo.save(product);

        System.out.println("Product saved with ID: " + savedProduct.getId());

        return savedProduct;

    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product getProductById(String id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product updateProduct(String id, Product updatedProduct) {

        Product existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStockQuantity(updatedProduct.getStockQuantity());
        existingProduct.setMinimumStock(updatedProduct.getMinimumStock());

        return productRepo.save(existingProduct);
    }

    public void deleteProduct(String id) {

        if (!productRepo.existsById(id)) {
            throw new RuntimeException("Product not found");
        }

        productRepo.deleteById(id);
    }

    public Product restockProduct(String id, int quantity)
    {
        //need it to be +ve
        if (quantity <= 0) {
            throw new IllegalArgumentException("Restock quantity must be greater than 0");
        }

        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));


        product.setStockQuantity(
                product.getStockQuantity() + quantity
        );

        return productRepo.save(product);
    }

    public List<Product> getLowStockProducts() {

        return productRepo.findAll()
                .stream()
                .filter(product ->
                        product.getStockQuantity() <= product.getMinimumStock()
                )
                .toList();
    }
}