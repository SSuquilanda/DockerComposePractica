import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaService } from './../../services/persona.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { Persona } from '../../services/persona.service';

@Component({
  selector: 'app-producto',
  imports: [FormsModule, CommonModule],
  templateUrl: './producto.component.html',
  standalone: true,
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  // Propiedades
  productos: Producto[] = [];
  nuevoProducto: Producto = { nombre: '', duenio: undefined };
  personas: Persona[] = [];
  productoSeleccionado?: Producto;
  mensajeFeedback: string = '';
  productoEditar: Producto | null = null;

  constructor(
    private productoService: ProductoService,
    private PersonaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarPersonas();
  }

  // Métodos de Mascotas
  cargarProductos(): void {
    this.productoService.listar().subscribe(data => {
      this.productos = data;
    });
  }

  guardarProducto(): void {
    if (!this.nuevoProducto.nombre  || !this.nuevoProducto.duenio?.id) return;

    this.productoService.guardar(this.nuevoProducto).subscribe(() => {
      this.nuevoProducto = { nombre: '', duenio: undefined };
      this.cargarProductos();
    });
  }

  editarProducto(): void {
    if (this.productoEditar && this.productoEditar.id) {
      this.productoService.editar(this.productoEditar).subscribe(() => {
        this.cargarProductos();
        this.cerrarModalEditar();
      });
    }
  }

  mostrarModalEditar(producto: Producto): void {
    this.productoEditar = { ...producto };
  }

  cerrarModalEditar(): void {
    this.productoEditar = null;
  }

  mostrarConfirmacion(producto: Producto): void {
    this.productoSeleccionado = producto;
  }

  cancelarEliminacion(): void {
    this.productoSeleccionado = undefined;
  }

  confirmarEliminacion(): void {
    if (this.productoSeleccionado?.id) {
      this.productoService.eliminar(this.productoSeleccionado.id).subscribe(() => {
        this.productoSeleccionado = undefined;
        this.cargarProductos();

        // Mostrar mensaje de éxito
        this.mensajeFeedback = '¡Producto eliminada con éxito!';

        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => this.mensajeFeedback = '', 3000);
      }, () => {
        // Si falla la eliminación, mostrar mensaje de error
        this.mensajeFeedback = 'Error al eliminar el producto. Inténtalo nuevamente.';

        setTimeout(() => this.mensajeFeedback = '', 3000);
      });
    }
  }

  // Métodos de Personas
  cargarPersonas(): void {
    this.PersonaService.listar().subscribe(data => {
      this.personas = data;
    });
  }
}
