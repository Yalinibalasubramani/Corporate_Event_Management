package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Payment 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String cardholderName;
    private double amount;
    private LocalDateTime paymentDateTime;

    public Payment() 
    {

    }

    public Payment(String cardholderName, double amount, LocalDateTime paymentDateTime) {
        this.cardholderName = cardholderName;
        this.amount = amount;
        this.paymentDateTime = paymentDateTime;
    }

    public int getId() 
    {
        return id;
    }

    public void setId(int id) 
    {
        this.id = id;
    }

    public String getCardholderName() 
    {
        return cardholderName;
    }

    public void setCardholderName(String cardholderName) 
    {
        this.cardholderName = cardholderName;
    }

    public double getAmount() 
    {
        return amount;
    }

    public void setAmount(double amount) 
    {
        this.amount = amount;
    }

    public LocalDateTime getPaymentDateTime() 
    {
        return paymentDateTime;
    }

    public void setPaymentDateTime(LocalDateTime paymentDateTime) 
    {
        this.paymentDateTime = paymentDateTime;
    }
}
