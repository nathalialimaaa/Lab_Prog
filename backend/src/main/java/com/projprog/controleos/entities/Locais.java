package com.projprog.controleos.entities;

import jakarta.persistence.*;

import java.util.UUID;


@Entity
@Table(name = "locais")
public class Locais {

    @Id
    private UUID idLocal;

    private String nomeLocal;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
}

