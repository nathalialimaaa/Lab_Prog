package com.projprog.controleos.services;

import com.projprog.controleos.entities.Places;
import com.projprog.controleos.repositories.PlacesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PlacesService {

    @Autowired
    private PlacesRepository placesRepository;

    public List<Places> buscarTodos() {
        return placesRepository.findAll();
    }

    public Places buscarPorId(UUID id) {
        return placesRepository.findById(id).orElseThrow();
    }

    public Places salvar(Places local) {

        return placesRepository.save(local);
    }

    public void deletar(UUID id) {
        placesRepository.deleteById(id);
    }
}