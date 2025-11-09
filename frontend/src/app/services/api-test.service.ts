// src/app/services/api-test.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTestService {

  private readonly TEST_URL = '/api/teste'; 

  constructor(private http: HttpClient) { }

  testarConexao(): Observable<string> {
    return this.http.get<string>(this.TEST_URL, { responseType: 'text' as 'json' }); 
  }
}