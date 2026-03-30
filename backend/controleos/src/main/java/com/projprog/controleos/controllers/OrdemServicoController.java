package com.projprog.controleos.controllers;
import com.projprog.controleos.entities.OrdemServico;
import com.projprog.controleos.services.OrdemServicoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/ordemServico")
public class OrdemServicoController {

    @Autowired
    private OrdemServicoService ordemServicoService;

    @GetMapping
    public List<OrdemServico> buscarTodos() {
        return ordemServicoService.buscarTodos();
    }

    @GetMapping("/{id}")
    public OrdemServico buscarPorId(@PathVariable Integer id) {
        return ordemServicoService.buscarPorId(id);
    }

    @PostMapping
    public OrdemServico salvar(@RequestBody OrdemServico ordemServico) {
        return ordemServicoService.salvar(ordemServico);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        ordemServicoService.deletar(id);
    }
}