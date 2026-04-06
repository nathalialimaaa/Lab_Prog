package com.projprog.controleos.repositories;

import com.projprog.controleos.entities.ServiceOrder;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ServiceOrderRepository extends JpaRepository<ServiceOrder, Integer> {
}