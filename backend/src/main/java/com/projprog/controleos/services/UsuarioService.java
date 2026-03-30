package com.projprog.controleos.services;

import com.projprog.controleos.entities.Usuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projprog.controleos.repositories.UsuarioRepository;

import java.util.List;
import java.util.UUID;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository UsuarioRepository;

    public List<Usuarios> buscarTodos() {
        return UsuarioRepository.findAll();
    }

    public Usuarios buscarPorId(UUID id) {
        return UsuarioRepository.findById(id).orElseThrow();
    }

    public Usuarios salvar(Usuarios usuario) {
        return UsuarioRepository.save(usuario);
    }

    public void deletar(UUID id) {
        UsuarioRepository.deleteById(id);
    }
}