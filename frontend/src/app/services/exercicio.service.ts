import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercicioService {
  private apiUrl = 'http://localhost:8080/exercicios'; // URL do seu backend

  constructor(private http: HttpClient) {}

  cadastrarExercicio(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
