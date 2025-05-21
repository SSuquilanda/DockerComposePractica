import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Persona {
  id?: number;
  nombre: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = '/api/personas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  guardar(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  eliminar(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editar(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${persona.id}`, persona);
  }
}
