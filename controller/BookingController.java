package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Booking;
import com.example.demo.repository.BookingRepository;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;
   
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        System.out.println("Received userID: " + booking.getUserID());
        return bookingRepository.save(booking);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable String userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingRepository.findById(id)
                .map(existingBooking -> {
                    // Only update the fields that are provided in the request body
                    if (updatedBooking.getBookingStatus() != null) {
                        existingBooking.setBookingStatus(updatedBooking.getBookingStatus());
                    }
                    // Add more fields if you allow partial updates for other fields
                    return bookingRepository.save(existingBooking);
                })
                .orElseGet(() -> {
                    // If booking doesn't exist, save the new one (or handle as you prefer)
                    updatedBooking.setId(id);
                    return bookingRepository.save(updatedBooking);
                });
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }
}
