package com.example.demo.model;


import jakarta.persistence.*;

@Entity
public class ContactMessage 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;
    private String email;
    private String inquiry;
    public Long getId() 
    {
        return id;
    }

    public void setId(Long id) 
    {
        this.id = id;
    }

    public String getName() 
    {
        return name;
    }

    public void setName(String name) 
    {
        this.name = name;
    }

    public String getPhone() 
    {
        return phone;
    }

    public void setPhone(String phone) 
    {
        this.phone = phone;
    }

    public String getEmail() 
    {
        return email;
    }

    public void setEmail(String email) 
    {
        this.email = email;
    }

    public String getInquiry() 
    {
        return inquiry;
    }

    public void setInquiry(String inquiry) 
    {
        this.inquiry = inquiry;
    }
}
