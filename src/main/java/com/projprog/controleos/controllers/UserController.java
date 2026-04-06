package com.projprog.controleos.controllers;
import com.projprog.controleos.entities.App_user;
import com.projprog.controleos.repositories.UserRepository;
import com.projprog.controleos.services.UserService;
import org.springframework.http.ResponseEntity;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body){
        String token = userService.login(
                body.get("email"),
                body.get("password")
        );
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body){

        App_user user = userService.register(
                body.get("firstName"),
                body.get("lastName"),
                body.get("cpf"),
                body.get("city"),
                body.get("uf"),
                body.get("phoneNumber"),
                body.get("email"),
                body.get("password")
        );
        user.setPassword(null); // remove a senha antes de enviar ao frontend
        return ResponseEntity.ok(user);
    }

}
