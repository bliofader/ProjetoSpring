import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../entities/personal';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({ providedIn: 'root' })
export class PersonalService {
  baseUrl = environment.baseUrl + '/personais';

  constructor(private http: HttpClient) {}

  getPersonalById(id: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.baseUrl}/${id}`);
  }

  getAllPersonais(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.baseUrl);
  }
}

