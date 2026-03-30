package com.projprog.controleos.repositories;

import com.projprog.controleos.entities.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UsuarioRepository extends JpaRepository<Usuarios, UUID> {
}