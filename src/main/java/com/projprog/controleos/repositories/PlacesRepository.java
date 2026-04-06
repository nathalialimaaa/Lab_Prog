package com.projprog.controleos.repositories;
import com.projprog.controleos.entities.Places;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PlacesRepository extends JpaRepository<Places, UUID> {
}