package com.example.demo.controller;
import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController 
{

    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventRepository eventRepository;
    @PostMapping("/post")
    public ResponseEntity<Event> addEvent(@RequestBody Event event) 
    {
            logger.info("Received event: {}", event);
            try 
            {
                Event savedEvent = eventRepository.save(event);
                return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
            } catch (Exception e) 
            {
                logger.error("Error saving event: ", e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }
    
    

    @GetMapping("/get")
    public ResponseEntity<List<Event>> getAllEvents() 
    {
            try 
            {
                List<Event> events = eventRepository.findAll();
                logger.info("Retrieving all events: {}", events);
                return new ResponseEntity<>(events, HttpStatus.OK);
            } 
            catch (Exception e) 
            {
                logger.error("Error retrieving events: ", e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) 
    {
            try 
            {
                Event event = eventRepository.findById(id).orElse(null);
                if (event != null) 
                {
                    logger.info("Event found: {}", event);
                    return new ResponseEntity<>(event, HttpStatus.OK);
                }
                logger.warn("Event with ID {} not found", id);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } 
            catch (Exception e) 
            {
                logger.error("Error retrieving event by ID: ", e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }
    @PutMapping("/put/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) 
    {
            try 
            {
                Event event = eventRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

                event.setEventType(eventDetails.getEventType());
                event.setDescription(eventDetails.getDescription());
                event.setTotalPackage(eventDetails.getTotalPackage());
                event.setParticipantCount(eventDetails.getParticipantCount());
                event.setCharges(eventDetails.getCharges());
                event.setImageUrl(eventDetails.getImageUrl());

                Event updatedEvent = eventRepository.save(event);
                logger.info("Updated event with id {}: {}", id, updatedEvent);
                return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
            } catch (Exception e) 
            {
                logger.error("Error updating event with id {}: ", id, e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) 
    {
            try 
            {
                Event event = eventRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
                eventRepository.delete(event);
                logger.info("Deleted event with id {}", id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } 
            catch (Exception e) 
            {
                logger.error("Error deleting event with id {}: ", id, e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }


}