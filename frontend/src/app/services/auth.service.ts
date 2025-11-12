import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { LoginRequest } from '../Models/login-request.model';

export interface LoginResponse {
  token: string;
  tipo: string;         // "Bearer"
  nomeUsuario: string;  // nome do usuário
  perfil: string;       // "Admin", "Comum", "Personal"
  usuarioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(credenciais: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credenciais, { headers });
  }

  salvarToken(token: string, idUsuario: number, nome: string, perfil: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem('jwt_token', token);
      sessionStorage.setItem('usuarioId', idUsuario.toString());
      sessionStorage.setItem('usuarioNome', nome);
      sessionStorage.setItem('usuarioPerfil', perfil); // ✅ perfil correto
    }
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!sessionStorage.getItem('jwt_token');
  }

  isAdmin(): boolean {
    if (this.isBrowser()) {
      const perfil = sessionStorage.getItem('usuarioPerfil');
      return perfil?.toLowerCase() === 'admin';
    }
    return false;
  }
  getUsuarioNome(): string {
    return sessionStorage.getItem('usuarioNome') || 'Usuário';
  }
  

  getUsuario(): { nome: string; perfil: string; usuarioId: number } | null {
    if (this.isBrowser()) {
      const nome = sessionStorage.getItem('usuarioNome');
      const perfil = sessionStorage.getItem('usuarioPerfil');
      const usuarioId = sessionStorage.getItem('usuarioId');
      if (nome && perfil && usuarioId) {
        return { nome, perfil, usuarioId: Number(usuarioId) };
      }
    }
    return null;
  }

  logout(): void {
    if (this.isBrowser()) {
      sessionStorage.clear();
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }
}
