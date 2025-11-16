import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Personal } from '../entities/personal';
import { Mensagem } from '../entities/mensagem';

@Injectable({ providedIn: 'root' })
export class PersonalService {
  // Endpoints base
  private baseUrlPersonais = environment.baseUrl + '/usuarios/personais';
  private baseUrlMensagens = environment.baseUrl + '/mensagens';

  constructor(private http: HttpClient) {}

  /**
   * ✅ Buscar todos os personais
   */
  getAllPersonais(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.baseUrlPersonais);
  }

  /**
   * ✅ Buscar personal por ID
   */
  getPersonalById(id: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.baseUrlPersonais}/${id}`);
  }

  /**
   * ✅ Enviar mensagem para um personal
   * payload deve conter: idUsuario, idPersonal, conteudo
   */
  enviarMensagem(payload: Partial<Mensagem>): Observable<Mensagem> {
    return this.http.post<Mensagem>(this.baseUrlMensagens, payload);
  }

  /**
   * ✅ Listar mensagens recebidas por um personal
   */
  listarMensagens(idPersonal: number): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(`${this.baseUrlMensagens}/personal/${idPersonal}`);
  }

  /**
   * ✅ (Opcional) Listar mensagens enviadas por um usuário comum
   */
  listarMensagensPorUsuario(idUsuario: number): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(`${this.baseUrlMensagens}/usuario/${idUsuario}`);
  }
}
