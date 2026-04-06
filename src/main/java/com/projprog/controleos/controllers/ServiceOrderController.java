package com.projprog.controleos.controllers;
import com.projprog.controleos.entities.ServiceOrder;
import com.projprog.controleos.services.ServiceOrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/ordem-servico")
public class ServiceOrderController {

    @Autowired
    private ServiceOrderService serviceOrderService;

    @GetMapping
    public List<ServiceOrder> searchAll() {return serviceOrderService.searchAll();}

    @GetMapping("/{id}")
    public ServiceOrder searchId(@PathVariable Integer id) {
        return serviceOrderService.searchId(id);
    }

    @PostMapping
    public ServiceOrder save(@RequestBody ServiceOrder serviceOrder) {
        return serviceOrderService.save(serviceOrder);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        serviceOrderService.delete(id);
    }
}