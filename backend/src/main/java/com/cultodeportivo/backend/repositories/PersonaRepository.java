package com.cultodeportivo.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cultodeportivo.backend.models.Persona;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
}