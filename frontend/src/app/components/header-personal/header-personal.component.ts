import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-personal',
  standalone: true,
  imports: [],
  templateUrl: './header-personal.component.html',
  styleUrl: './header-personal.component.css'
})
export class HeaderPersonalComponent implements  OnInit {
  nomePersonal: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const nomeStorage = localStorage.getItem('usuarioNome');

    if(nomeStorage){
      this.nomePersonal = this.NomeArrumado(nomeStorage);
    }
   
  }

  NomeArrumado(str: string): string {
  if (!str) {
    return '';
  }
 
  str = str.toLowerCase();
  
  
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

   onLogout(): void {
    const confirmacao = confirm('Deseja realmente sair do sistema?');
    if (confirmacao) {
      this.router.navigate(['/']);
    }
  }


}

