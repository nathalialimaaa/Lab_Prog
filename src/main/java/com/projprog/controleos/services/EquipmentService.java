package com.projprog.controleos.services;

import com.projprog.controleos.entities.Equipment;
import com.projprog.controleos.repositories.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    public List<Equipment> buscarTodos() {
        return equipmentRepository.findAll();
    }

    public Equipment buscarPorId(UUID id) {
        return equipmentRepository.findById(id).orElseThrow();
    }

    public Equipment salvar(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public void deletar(UUID id) {equipmentRepository.deleteById(id);
    }
}