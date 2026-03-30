package com.projprog.controleos.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;


@Entity
@Table(name = "equipamentos")
public class Equipamentos {

    @Id
    private UUID tipoEquipamentoId;

    private String nomeEquipamento;

}

