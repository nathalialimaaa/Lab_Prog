package com.projprog.controleos.repositories;

import com.projprog.controleos.entities.OrdemServico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdemServicoRepository extends JpaRepository<OrdemServico, Integer> {
}