package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Signup;

import java.util.Optional;

public interface SignupRepo extends JpaRepository<Signup, Long> {
        Signup findByUsername(String username);
        Signup findByEmail(String email);
        boolean existsByEmail(String email);
        Optional<Signup> findByEmailAndPassword(String email, String password);
    }
    
