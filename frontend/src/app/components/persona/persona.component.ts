import { Component, OnInit } from '@angular/core';
import { Persona, PersonaService } from '../../services/persona.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-persona',
  imports: [FormsModule, CommonModule],
  templateUrl: './persona.component.html',
  standalone: true,
  styleUrl: './persona.component.scss'
})
export class PersonaComponent implements OnInit {
  personas: Persona[] = [];
  nuevaPersona: Persona = { nombre: '', correo: '' };

  personaSeleccionada?: Persona;
  mensajeFeedback: string = '';
  personaEditar: Persona | null = null;

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.personaService.listar().subscribe(data => {
      this.personas = data;
    });
  }

  guardarPersona(): void {
    if (!this.nuevaPersona.nombre || !this.nuevaPersona.correo) return;

    this.personaService.guardar(this.nuevaPersona).subscribe(() => {
      this.nuevaPersona = { nombre: '', correo: '' };
      this.cargarPersonas();
    });
  }

  editarPersona(): void {
    if (this.personaEditar && this.personaEditar.id) {
      this.personaService.editar(this.personaEditar).subscribe(() => {
        this.cargarPersonas();
        this.cerrarModalEditar();
      });
    }
  }


  mostrarModalEditar(persona: Persona): void {
    this.personaEditar = { ...persona };
  }

  cerrarModalEditar(): void {
    this.personaEditar = null;
  }

  mostrarConfirmacion(persona: Persona): void {
    this.personaSeleccionada = persona;
  }

  cancelarEliminacion(): void {
    this.personaSeleccionada = undefined;
  }

  confirmarEliminacion(): void {
    if (this.personaSeleccionada?.id) {
      this.personaService.eliminar(this.personaSeleccionada.id).subscribe(() => {
        this.personaSeleccionada = undefined;
        this.cargarPersonas();

        // Mostrar mensaje de éxito
        this.mensajeFeedback = 'Persona eliminada con éxito!';

        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => this.mensajeFeedback = '', 3000);
      }, () => {
        // Si falla la eliminación, mostrar mensaje de error
        this.mensajeFeedback = 'Error al eliminar la persona. Inténtalo nuevamente.';

        setTimeout(() => this.mensajeFeedback = '', 3000);
      });
    }
  }
}
