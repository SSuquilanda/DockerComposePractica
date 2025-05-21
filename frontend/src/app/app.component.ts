import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonaComponent } from './components/persona/persona.component';
import {ProductoComponent} from './components/producto/producto.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterModule, PersonaComponent, ProductoComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent  {

}

