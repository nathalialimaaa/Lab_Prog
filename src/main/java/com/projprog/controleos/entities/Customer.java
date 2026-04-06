package com.projprog.controleos.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    private UUID idCustomer;

    private String razaoSocial;
    private String nomeFantasia;
    private String cnpj;
    private String email;
    private String phoneNumber;

}

