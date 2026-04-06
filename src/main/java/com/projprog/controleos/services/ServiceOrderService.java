package com.projprog.controleos.services;

import com.projprog.controleos.entities.ServiceOrder;
import com.projprog.controleos.repositories.ServiceOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceOrderService {

    @Autowired
    private ServiceOrderRepository serviceOrderRepository;

    public List<ServiceOrder> searchAll() {return serviceOrderRepository.findAll();}

    public ServiceOrder searchId(Integer id) {return serviceOrderRepository.findById(id).orElseThrow();}

    public ServiceOrder save(ServiceOrder serviceOrder) {return serviceOrderRepository.save(serviceOrder);}

    public void delete(Integer id) {
        serviceOrderRepository.deleteById(id);}
}