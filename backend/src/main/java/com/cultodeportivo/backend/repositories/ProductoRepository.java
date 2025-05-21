package com.cultodeportivo.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.cultodeportivo.backend.models.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
