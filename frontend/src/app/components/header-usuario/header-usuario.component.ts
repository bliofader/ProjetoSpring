import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-usuario',
  standalone: true,
  imports: [],
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.css'
})
export class HeaderUsuarioComponent implements  OnInit {
  nomeUsuario: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const nomeStorage = localStorage.getItem('usuarioNome');

    if(nomeStorage){
      this.nomeUsuario = this.NomeArrumado(nomeStorage);
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
      localStorage.clear()
      this.router.navigate(['/']);
    }
  }
}