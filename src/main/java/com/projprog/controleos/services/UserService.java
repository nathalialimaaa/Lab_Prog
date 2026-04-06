package com.projprog.controleos.services;

import com.projprog.controleos.entities.App_user;
import com.projprog.controleos.entities.Profile;
import com.projprog.controleos.repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String secret;
    private final long expirationTime;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${security.jwt.secret-key}") String secret,
            @Value("${security.jwt.expiration-time}") long expirationTime
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.secret = secret;
        this.expirationTime = expirationTime;
    }

    public String login(String email, String password) {
        App_user appUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));


        if (!passwordEncoder.matches(password, appUser.getPassword())) {
            throw new RuntimeException("Senha incorreta");
        }

        return generateToken(appUser);
    }


    public App_user register(
            String firstName,
            String lastName,
            String cpf,
            String city,
            String uf,
            String phoneNumber,
            String email,
            String password
    ) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Usuário já existe");
        }

        App_user user = new App_user();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setCpf(cpf);
        user.setCity(city);
        user.setUf(uf);
        user.setPhoneNumber(phoneNumber);
        user.setEmail(email);


        user.setPassword(passwordEncoder.encode(password));

        user.setProfileUser(Profile.Analista);

        return userRepository.save(user);
    }


    private String generateToken(App_user appUser) {
        return Jwts.builder()
                .setSubject(appUser.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }
}