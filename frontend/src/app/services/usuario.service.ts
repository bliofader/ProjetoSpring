import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../entities/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrlUsuarios = environment.baseUrl + '/usuarios';

  constructor(private http: HttpClient) {}

  // ✅ Cadastro de usuário (Comum ou Personal)
  create(formData: FormData): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrlUsuarios, formData);
  }

  // 🔍 Buscar usuário por ID
  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrlUsuarios}/${id}`);
  }

  // 🔍 Buscar todos os usuários
  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrlUsuarios);
  }

  // 🔍 Buscar usuários por tipo
  findByTipo(tipo: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrlUsuarios}/tipo/${tipo}`);
  }

  // ✏️ Atualizar usuário com imagem
  updateComImagem(id: number, formData: FormData): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrlUsuarios}/${id}`, formData);
  }

  // ✏️ Atualizar usuário sem imagem
  atualizarUsuario(id: number, dados: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrlUsuarios}/${id}`, dados);
  }

  // 🗑️ Deletar usuário
  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrlUsuarios}/${id}`, { responseType: 'text' });
  }
}
