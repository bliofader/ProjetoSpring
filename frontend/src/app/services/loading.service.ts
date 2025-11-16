import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading = signal(false);

  setLoading(state: boolean): void {
    this.isLoading.set(state);
  }
  enviarMensagem(payload: any) {
  return this.http.post('/api/mensagens', payload);
}

}