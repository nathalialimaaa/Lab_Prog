package com.projprog.controleos.controllers;
import com.projprog.controleos.entities.Locais;
import com.projprog.controleos.services.LocalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/locais")
public class LocaisController {

    @Autowired
    private LocalService localService;

    @GetMapping
    public List<Locais> buscarTodos() {
        return localService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Locais buscarPorId(@PathVariable UUID id) {
        return localService.buscarPorId(id);
    }

    @PostMapping
    public Locais salvar(@RequestBody Locais locais ) {
        return localService.salvar(locais);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable UUID id) {
        localService.deletar(id);
    }
}