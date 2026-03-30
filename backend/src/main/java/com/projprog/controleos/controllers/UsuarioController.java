package com.projprog.controleos.controllers;
import com.projprog.controleos.entities.Usuarios;
import com.projprog.controleos.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuarios> buscarTodos() {
        return usuarioService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Usuarios buscarPorId(@PathVariable UUID id) {
        return usuarioService.buscarPorId(id);
    }

    @PostMapping
    public Usuarios salvar(@RequestBody Usuarios usuario) {
        return usuarioService.salvar(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable UUID id) {
        usuarioService.deletar(id);
    }
}