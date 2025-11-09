import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../Models/login-request.model';
import { JwtHelperService } from '@auth0/angular-jwt'; 

export interface LoginResponse {
  token: string;
  tipo: string;
  nomeUsuario: string;
  perfil: string;
  usuarioId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/auth';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(credenciais: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credenciais);
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
