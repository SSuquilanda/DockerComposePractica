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
import com.cultodeportivo.backend.models.Producto;
import com.cultodeportivo.backend.models.Persona;
import com.cultodeportivo.backend.services.ProductoService;
import com.cultodeportivo.backend.services.PersonaService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoRestController {

    @Autowired
    private ProductoService productoService;

    @Autowired
    private PersonaService personaService;

    @GetMapping
    public List<Producto> listarTodas() {
        return productoService.obtenerTodas();
    }
    @GetMapping("/{id}")
    public Producto obtenerPorId(@PathVariable Long id) {
        return productoService.obtenerPorId(id).orElse(null);
    }
    @PostMapping
    public Producto guardar(@RequestBody Producto producto) {
        if (producto.getDuenio() != null) {
            Long personaId = producto.getDuenio().getId();
            Persona duenio = personaService.obtenerPorId(personaId).orElse(null);
            producto.setDuenio(duenio);
        }
        return productoService.guardar(producto);
    }
    @PutMapping("/{id}")
    public Producto editar(@RequestBody Producto producto) {
        System.out.println(producto);
        if (producto.getDuenio() != null) {
            Long personaId = producto.getDuenio().getId();
            Persona duenio = personaService.obtenerPorId(personaId).orElse(null);
            producto.setDuenio(duenio);
        }
        return productoService.editar(producto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
    }
}
