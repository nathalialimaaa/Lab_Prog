package com.projprog.controleos.entities;

import jakarta.persistence.*;

import java.util.UUID;


@Entity
@Table(name = "places")
public class Places {

    @Id
    private UUID place_id;

    private String placeName;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}

