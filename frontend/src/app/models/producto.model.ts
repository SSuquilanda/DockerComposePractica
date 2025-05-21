import { Persona } from './persona.model';

export interface Producto {
  id?: number;
  nombre: string;
  precio?: number;
  cantidad?: number;
  duenio?: Persona;
}
