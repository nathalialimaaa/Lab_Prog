package com.projprog.controleos.repositories;
import com.projprog.controleos.entities.Equipamentos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EquipamentoRepository extends JpaRepository<Equipamentos, UUID> {
}
