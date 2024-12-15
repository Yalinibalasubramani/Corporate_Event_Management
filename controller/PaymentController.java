package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Payment;
import com.example.demo.service.PaymentService;
import com.example.demo.model.PaymentDTO;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @PostMapping
    public ResponseEntity<String> createPayment(@RequestBody PaymentDTO paymentDTO) {
        try {
            logger.debug("Received payment data: {}", paymentDTO);
            Payment payment = new Payment();
            payment.setCardholderName(paymentDTO.getCardholderName());
            payment.setAmount(paymentDTO.getAmount());
            payment.setPaymentDateTime(LocalDateTime.now());
    
            paymentService.savePayment(payment);
            return ResponseEntity.ok("Payment processed successfully");
        } catch (Exception e) {
            logger.error("Error processing payment", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed");
        }
    }
    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable int id) {
        Payment payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(payment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable int id) {
    try {
        paymentService.deletePaymentById(id); // Implement this method in the service
        return ResponseEntity.ok("Payment deleted successfully");
    } catch (Exception e) {
        logger.error("Error deleting payment", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment deletion failed");
    }
}

}
