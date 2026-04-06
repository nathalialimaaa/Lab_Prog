package com.projprog.controleos.controllers;
import com.projprog.controleos.entities.Equipment;
import com.projprog.controleos.services.EquipmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/equipamentos")
public class EquipmentController {

    @Autowired
    private EquipmentService equipamentosService;

    @GetMapping
    public List<Equipment> buscarTodos() {
        return equipamentosService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Equipment buscarPorId(@PathVariable UUID id) {
        return equipamentosService.buscarPorId(id);
    }

    @PostMapping
    public Equipment salvar(@RequestBody Equipment equipment) {
        return equipamentosService.salvar(equipment);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable UUID id) {
        equipamentosService.deletar(id);
    }
}