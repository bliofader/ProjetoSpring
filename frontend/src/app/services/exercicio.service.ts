import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { Exercicio } from '../entities/exercicio';

@Injectable({
  providedIn: 'root'
})
export class ExercicioService {
  private apiUrl = 'http://localhost:8080/exercicios';

  constructor(private http: HttpClient) {}

  cadastrarExercicio(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  listarExercicios(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Exercicio> {
    return this.http.get<Exercicio>(`${this.apiUrl}/${id}`);
  }
  atualizarExercicio(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }
  

  deletarExercicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
