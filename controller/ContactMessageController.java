package com.example.demo.controller;

import com.example.demo.model.ContactMessage;
import com.example.demo.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contact")
public class ContactMessageController 
{

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @PostMapping("/postquery")
    public ResponseEntity<String> saveMessage(@RequestBody ContactMessage contactMessage) 
    {
        contactMessageRepository.save(contactMessage);
        return ResponseEntity.ok("Message sent successfully");
    }

    @GetMapping("/messages")
    public List<ContactMessage> getAllMessages() 
    {
        return contactMessageRepository.findAll();
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) 
    {
        Optional<ContactMessage> message = contactMessageRepository.findById(id);
        if (message.isPresent()) 
        {
            contactMessageRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        else 
        {
            return ResponseEntity.notFound().build();
        }
    }

}
