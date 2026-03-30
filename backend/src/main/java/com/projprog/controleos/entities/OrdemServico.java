package com.projprog.controleos.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "ordens_servico")
public class OrdemServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer numeroOs;

    private String marca;
    private String modelo;
    private String numeroSerie;
    private String nomeFuncionario;
    private String numeroCliente;
    private String problemaRelatado;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_local")
    private Locais local;

    @ManyToOne
    @JoinColumn(name = "tipo_equipamento_id")
    private Equipamentos tipoEquipamento;

    @ManyToOne
    @JoinColumn(name = "criado_por_id")
    private Usuarios usuario;

    private LocalDateTime abertaEm;
    private LocalDateTime fechadaEm;

    @Enumerated(EnumType.STRING)
    private statusOs status;
}

