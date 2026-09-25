package com.example.stockproject.controller;

import com.example.stockproject.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/sales")
    public ResponseEntity<?> getSalesReport() {
        return ResponseEntity.ok(
                reportService.getSalesReport()
        );
    }

    //best selling products
    @GetMapping("/best-selling")
    public ResponseEntity<?> getBestSellingProducts() {
        return ResponseEntity.ok(
                reportService.getBestSellingProducts()
        );
    }
}
