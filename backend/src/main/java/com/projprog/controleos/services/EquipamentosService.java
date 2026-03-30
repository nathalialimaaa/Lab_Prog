package com.projprog.controleos.services;

import com.projprog.controleos.entities.Equipamentos;
import com.projprog.controleos.repositories.EquipamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class EquipamentosService {

    @Autowired
    private EquipamentoRepository equipamentosRepository;

    public List<Equipamentos> buscarTodos() {
        return equipamentosRepository.findAll();
    }

    public Equipamentos buscarPorId(UUID id) {
        return equipamentosRepository.findById(id).orElseThrow();
    }

    public Equipamentos salvar(Equipamentos equipamentos) {
        return equipamentosRepository.save(equipamentos);
    }

    public void deletar(UUID id) {equipamentosRepository.deleteById(id);
    }
}