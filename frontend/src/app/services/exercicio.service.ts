import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercicio } from '../entities/exercicio'; // ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class ExercicioService {
  private apiUrl = 'http://localhost:8080/exercicios'; // URL do seu backend

  constructor(private http: HttpClient) {}

  cadastrarExercicio(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  listarExercicios(): Observable<Exercicio[]> {
    return this.http.get<Exercicio[]>(this.apiUrl);
  }
}
