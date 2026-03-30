package com.projprog.controleos.controllers;
import com.projprog.controleos.entities.Equipamentos;
import com.projprog.controleos.services.EquipamentosService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/equipamentos")
public class EquipamentosController {

    @Autowired
    private EquipamentosService equipamentosService;

    @GetMapping
    public List<Equipamentos> buscarTodos() {
        return equipamentosService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Equipamentos buscarPorId(@PathVariable UUID id) {
        return equipamentosService.buscarPorId(id);
    }

    @PostMapping
    public Equipamentos salvar(@RequestBody Equipamentos equipamentos) {
        return equipamentosService.salvar(equipamentos);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable UUID id) {
        equipamentosService.deletar(id);
    }
}