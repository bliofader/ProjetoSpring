import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../entities/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = environment.baseUrl + '/usuarios';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  findComuns(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl + ''); // ✅ se tiver esse endpoint no backend
  }
  create(usuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(this.baseUrl, usuario);
}

}