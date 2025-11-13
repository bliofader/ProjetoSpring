import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { Lista } from '../entities/lista';
import { ListaDTO } from '../entities/lista-dto';

@Injectable({ providedIn: 'root' })
export class ListaService {
  private baseUrl = environment.baseUrl + '/listas';

  constructor(private http: HttpClient) {}

  listarPorUsuario(): Observable<Lista[]> {
    const id = sessionStorage.getItem('usuarioId');
    return this.http.get<Lista[]>(`${this.baseUrl}/usuario/${id}`);
  }

  criarLista(dto: ListaDTO): Observable<Lista> {
    return this.http.post<Lista>(this.baseUrl, dto);
  }
  buscarPorId(id: number): Observable<Lista> {
  return this.http.get<Lista>(`${this.baseUrl}/${id}`);
}

}
