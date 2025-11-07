import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../Models/login-request.model';

interface LoginResponse {
  token: string;
  nome: string;  
  perfil: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/auth';



  constructor(private http: HttpClient) {}

  login(credenciais: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credenciais);
  }

  salvarToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
}

  isLoggedIn(): boolean {
    return !!this.getToken(); 
}
}