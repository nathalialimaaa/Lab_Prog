package com.projprog.controleos.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "app_user")
public class App_user {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;

    private String firstName;
    private String lastName;
    private String cpf;
    private String city;
    private String uf;
    private String phoneNumber;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Profile profileUser;
}

