import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.css'
})
export class HeaderUsuarioComponent implements  OnInit {
  nomeUsuario: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.nomeUsuario = sessionStorage.getItem('usuarioNome');
  }

   onLogout(): void {
    const confirmacao = confirm('Deseja realmente sair do sistema?');
    if (confirmacao) {
      this.router.navigate(['/']);
      sessionStorage.clear();
    }
  }
}