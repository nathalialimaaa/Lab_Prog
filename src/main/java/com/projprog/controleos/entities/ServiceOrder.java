package com.projprog.controleos.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "Service Order")
public class ServiceOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer soNumber;

    private String brand;
    private String modelo;
    private String serialNumber;
    private String employeeName;
    private String customerPhoneNumber;
    private String problemReported;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Places places;

    @ManyToOne
    @JoinColumn(name = "equipment_type_id")
    private Equipment equipment_type_id;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private App_user appuser;

    private LocalDateTime opened;
    private LocalDateTime closed;

    @Enumerated(EnumType.STRING)
    private statusOs status;
}

