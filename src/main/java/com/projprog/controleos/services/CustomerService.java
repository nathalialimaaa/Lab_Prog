package com.projprog.controleos.services;

import com.projprog.controleos.entities.Customer;
import com.projprog.controleos.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projprog.controleos.repositories.CustomerRepository;
import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository clienteRepository;

    public List<Customer> buscarTodos() {
        return clienteRepository.findAll();
    }

    public Customer buscarPorId(UUID id) {
        return clienteRepository.findById(id).orElseThrow();
    }

    public Customer salvar(Customer cliente) {
        return clienteRepository.save(cliente);
    }

    public void deletar(UUID id) {
        clienteRepository.deleteById(id);
    }
}