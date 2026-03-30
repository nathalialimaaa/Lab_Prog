package com.projprog.controleos.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "usuarios")
public class Usuarios {

    @Id
    private UUID idUsuario;

    private String nomeUsuario;
    private String email;
    private String senhaHash;

    @Enumerated(EnumType.STRING)
    private Perfil perfilUsuario;
}

