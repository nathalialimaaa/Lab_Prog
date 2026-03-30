package com.projprog.controleos.repositories;
import com.projprog.controleos.entities.Locais;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LocalRepository extends JpaRepository<Locais, UUID> {
}