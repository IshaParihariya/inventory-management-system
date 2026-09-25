package com.example.stockproject.service;

import com.example.stockproject.model.Order;
import com.example.stockproject.model.OrderItem;
import com.example.stockproject.repo.OrderRepo;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final OrderRepo orderRepo;

    public ReportService(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    // sales report
    public Map<String, Object> getSalesReport() {

        List<Order> orders = orderRepo.findAll();

        double totalSales = 0;

        for (Order order : orders) {
            totalSales =totalSales+ order.getTotal();
        }

        Map<String, Object> report = new HashMap<>();

        report.put("totalOrders", orders.size());
        report.put("totalSales", totalSales);

        return report;
    }

    // best selling products here
    public List<Map<String, Object>> getBestSellingProducts() {

        List<Order> orders = orderRepo.findAll();

        Map<String, Integer> sales = new HashMap<>();
        Map<String, String> productNames = new HashMap<>();

        for (Order order : orders) {
            //each order contains order iteks so..

            for (OrderItem item : order.getItems()) {

                String productId = item.getProductId();

                sales.put(
                        productId,
                        sales.getOrDefault(productId, 0) + item.getQuantity()
                );

                productNames.put(
                        productId,
                        item.getProductName()
                );
            }
        }

        //our Json response
        List<Map<String, Object>> result = new java.util.ArrayList<>();

        for (String productId : sales.keySet()) {

            Map<String, Object> product = new HashMap<>();

            product.put("productId", productId);
            product.put("productName", productNames.get(productId));
            product.put("quantitySold", sales.get(productId));

            result.add(product);
        }

        result.sort((a, b) ->
                (Integer) b.get("quantitySold") - (Integer) a.get("quantitySold")
        );
        return result;
    }
}