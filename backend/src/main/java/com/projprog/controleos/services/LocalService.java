package com.projprog.controleos.services;

import com.projprog.controleos.repositories.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.projprog.controleos.entities.Locais;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LocalService {

    @Autowired
    private LocalRepository localRepository;

    public List<Locais> buscarTodos() {
        return localRepository.findAll();
    }

    public Locais buscarPorId(UUID id) {
        return localRepository.findById(id).orElseThrow();
    }

    public Locais salvar(Locais local) {
        return localRepository.save(local);
    }

    public void deletar(UUID id) {
        localRepository.deleteById(id);
    }
}