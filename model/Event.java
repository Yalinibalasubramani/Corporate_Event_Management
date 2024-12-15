package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_type")
    private String eventType;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "participant_count")
    private Integer participantCount;

    @Column(name = "total_package")
    private Integer totalPackage;

    @Column(name = "charges")
    private Double charges;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Integer getParticipantCount() { return participantCount; }
    public void setParticipantCount(Integer participantCount) { this.participantCount = participantCount; }
    public Integer getTotalPackage() { return totalPackage; }
    public void setTotalPackage(Integer totalPackage) { this.totalPackage = totalPackage; }
    public Double getCharges() { return charges; }
    public void setCharges(Double charges) { this.charges = charges; }
}
