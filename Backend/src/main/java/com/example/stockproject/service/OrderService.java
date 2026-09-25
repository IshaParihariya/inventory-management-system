package com.example.stockproject.service;

import com.example.stockproject.model.Order;
import com.example.stockproject.model.OrderItem;
import com.example.stockproject.model.Product;
import com.example.stockproject.repo.OrderRepo;
import com.example.stockproject.repo.ProductRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Slf4j
public class OrderService {

    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;

    public OrderService(OrderRepo orderRepo, ProductRepo productRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }

    // create order
    public Order createOrder(Order order) {

        log.info("inside createOrder");

        double total = 0;

        for (OrderItem item : order.getItems()) {

            //trying to check each prouduct exists here
            Product product = productRepo.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (item.getQuantity() <= 0) {
                throw new RuntimeException("Quantity must be greater than 0");
            }

            if (product.getStockQuantity() < item.getQuantity()) {
                throw new RuntimeException("Not enough stock");
            }

            double subtotal = product.getPrice() * item.getQuantity();

            item.setProductName(product.getName());
            item.setPrice(product.getPrice());

            product.setStockQuantity(
                    product.getStockQuantity() - item.getQuantity()
            );

            productRepo.save(product);

            total = total + subtotal;
        }

        order.setTotal(total);
        order.setCreatedAt(LocalDateTime.now());

        return orderRepo.save(order);
    }

    // order history
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }
}