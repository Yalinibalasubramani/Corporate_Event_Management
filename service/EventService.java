package com.example.demo.service;

// EventService.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;


@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // Update an event
    public Event updateEvent(Long id, Event eventDetails) 
    {
        Event event = eventRepository.findById(id)
                .orElseThrow();

        event.setEventType(eventDetails.getEventType());
        event.setDescription(eventDetails.getDescription());
        event.setTotalPackage(eventDetails.getTotalPackage());
        event.setParticipantCount(eventDetails.getParticipantCount());
        event.setCharges(eventDetails.getCharges());
        event.setImageUrl(eventDetails.getImageUrl());

        return eventRepository.save(event);
    }

    // Delete an event
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow();

        eventRepository.delete(event);
    }

    // Other methods (like create, get, etc.)
}
