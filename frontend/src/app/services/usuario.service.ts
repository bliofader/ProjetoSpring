import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../entities/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = environment.baseUrl + '/usuarios';

  constructor(private http: HttpClient) {}

  // ✅ Cadastro de usuário com imagem
  create(formData: FormData): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, formData);
  }

  // 🔍 Buscar usuário por ID
  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  // 🔍 Buscar todos os usuários
  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  // 🔍 Buscar usuários comuns
  findComuns(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/tipo/Comum`);
  }

  // 🔐 Buscar usuário logado
  getUsuarioLogado(): Observable<Usuario> {
    const token = sessionStorage.getItem('jwt_token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<Usuario>(`${this.baseUrl}/me`, { headers });
  }

  // ✏️ Atualizar usuário sem imagem
  atualizarUsuario(id: number, dados: Partial<Usuario>): Observable<Usuario> {
    const token = sessionStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, dados, { headers });
  }

  // ✏️ Atualizar usuário com imagem
  updateComImagem(id: number, formData: FormData): Observable<Usuario> {
    const token = sessionStorage.getItem('jwt_token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, formData, { headers });
  }

  // 🗑️ Deletar usuário
  delete(id: number): Observable<string> {
    const token = sessionStorage.getItem('jwt_token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers, responseType: 'text' });
  }
}
