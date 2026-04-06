package com.projprog.controleos.controllers;
import com.projprog.controleos.entities.Customer;

import com.projprog.controleos.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;



@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> buscarTodos() {
        return customerService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Customer buscarPorId(@PathVariable UUID id) {
        return customerService.buscarPorId(id);
    }

    @PostMapping
    public Customer salvar(@RequestBody Customer customer) {
        return customerService.salvar(customer);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable UUID id) {
        customerService.deletar(id);
    }
}