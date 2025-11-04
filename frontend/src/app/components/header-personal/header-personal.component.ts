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
  nomeUsuario: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.nomeUsuario = localStorage.getItem('usuarioNome');
  }

   onLogout(): void {
    const confirmacao = confirm('Deseja realmente sair do sistema?');
    if (confirmacao) {
      this.router.navigate(['/']);
    }
  }


}
