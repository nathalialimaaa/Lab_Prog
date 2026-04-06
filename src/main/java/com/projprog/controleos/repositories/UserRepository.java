package com.projprog.controleos.repositories;

import com.projprog.controleos.entities.App_user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<App_user, UUID> {
    Optional<App_user> findByEmail(String email);
}