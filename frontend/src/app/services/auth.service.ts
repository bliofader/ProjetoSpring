import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { LoginRequest } from '../Models/login-request.model';

export interface LoginResponse {
  token: string;
  tipo: string;
  nomeUsuario: string;
  usuarioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(credenciais: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credenciais, { headers });
  }

  salvarToken(token: string, idUsuario: number, nome?: string, tipo?: string): void {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('usuarioId', idUsuario.toString());
    if (nome) localStorage.setItem('usuarioNome', nome);
    if (tipo) localStorage.setItem('usuarioTipo', tipo);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
