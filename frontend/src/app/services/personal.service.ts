import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mensagem } from '../entities/mensagem';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getPersonalById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/personais/${id}`);
  }

  enviarMensagem(payload: Partial<Mensagem>) {
    return this.http.post(`${this.apiUrl}/mensagens`, payload);
  }

  listarMensagens(idPersonal: number) {
    return this.http.get<Mensagem[]>(`${this.apiUrl}/mensagens/personal/${idPersonal}`);
  }
}
