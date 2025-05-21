package com.cultodeportivo.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cultodeportivo.backend.models.Persona;
import com.cultodeportivo.backend.services.PersonaService;

@RestController
@RequestMapping("/api/personas")
@CrossOrigin(origins = "*") // Permitir acceso desde Angular
public class PersonaRestController {

    @Autowired
    private PersonaService personaService;

    @GetMapping
    public List<Persona> listarTodas() {
        return personaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public Persona obtenerPorId(@PathVariable Long id) {
        return personaService.obtenerPorId(id).orElse(null);
    }

    @PostMapping
    public Persona guardar(@RequestBody Persona persona) {
        return personaService.guardar(persona);
    }

    @PutMapping("/{id}")
    public Persona editar(@RequestBody Persona persona) {
        return personaService.editar(persona);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        personaService.eliminar(id);
    }
}
