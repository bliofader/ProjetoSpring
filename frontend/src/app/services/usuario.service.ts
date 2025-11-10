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

  // ✅ CADASTRAR SEM IMAGEM
  createSemImagem(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  // ✅ CADASTRAR COM IMAGEM
  createComImagem(usuario: Usuario, imagem: File): Observable<Usuario> {
    const formData = new FormData();
    formData.append('usuario', new Blob([JSON.stringify(usuario)], { type: 'application/json' }));
    formData.append('imagem', imagem);

    return this.http.post<Usuario>(this.baseUrl, formData);
  }

  // RESTANTE DOS MÉTODOS
  getUsuarioById(id: number): Observable<Usuario> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
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
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<Usuario>(`${this.baseUrl}/me`, { headers });
  }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  findComuns(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/tipo/Comum`);
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, usuario);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
