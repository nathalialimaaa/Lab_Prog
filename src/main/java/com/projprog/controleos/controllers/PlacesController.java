package com.projprog.controleos.controllers;
import com.projprog.controleos.entities.Places;
import com.projprog.controleos.services.PlacesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/locais")
public class PlacesController {

    @Autowired
    private PlacesService PlacesService;

    @GetMapping
    public List<Places> buscarTodos() {
        return PlacesService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Places buscarPorId(@PathVariable UUID id) {
        return PlacesService.buscarPorId(id);
    }

    @PostMapping
    public Places salvar(@RequestBody Places places ) {
        return PlacesService.salvar(places);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable UUID id) {
        PlacesService.deletar(id);
    }
}