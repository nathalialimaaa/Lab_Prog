package com.projprog.controleos.services;

import com.projprog.controleos.entities.OrdemServico;
import com.projprog.controleos.repositories.OrdemServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrdemServicoService {

    @Autowired
    private OrdemServicoRepository ordemServicoRepository;

    public List<OrdemServico> buscarTodos() {return ordemServicoRepository.findAll();}

    public OrdemServico buscarPorId(Integer id) {return ordemServicoRepository.findById(id).orElseThrow();}

    public OrdemServico salvar(OrdemServico ordemServico) {return ordemServicoRepository.save(ordemServico);}

    public void deletar(Integer id) {ordemServicoRepository.deleteById(id);}
}