import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8092/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarioById(id: number): Observable<Usuario> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`, { headers });
  }

  atualizarUsuario(id: number, dados: Partial<Usuario>): Observable<Usuario> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, dados, { headers });
  }

  getUsuarioLogado(): Observable<Usuario> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Usuario>(`${this.baseUrl}/me`, { headers });
  }
}
