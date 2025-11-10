import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { LoginRequest } from '../Models/login-request.model';

export interface LoginResponse {
  token: string;
  tipo: string;        // tipo do token (Bearer)
  nomeUsuario: string;
  perfil: string;      // perfil do usuário (Admin, Comum, Personal)
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

  salvarToken(token: string, idUsuario: number, nome?: string, perfil?: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem('jwt_token', token);
      window.sessionStorage.setItem('usuarioId', idUsuario.toString());
      if (nome) window.sessionStorage.setItem('usuarioNome', nome);
      if (perfil) window.sessionStorage.setItem('usuarioPerfil', perfil);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage.getItem('jwt_token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      // ✅ normaliza para evitar problemas de maiúscula/minúscula
      return window.sessionStorage.getItem('usuarioPerfil')?.toLowerCase() === 'admin';
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.clear();
    }
  }
}
