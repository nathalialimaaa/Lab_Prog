package com.projprog.controleos.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;


@Entity
@Table(name = "equipment")
public class Equipment {

    @Id
    private UUID equipmentTypeId;

    private String equipmentName;

}

