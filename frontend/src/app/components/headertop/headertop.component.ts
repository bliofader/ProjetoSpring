import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './headertop.component.html',
  styleUrl: './headertop.component.css',
})
export class HeaderTopComponent {
  constructor(private router: Router) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }

  onLogout(): void {
    const confirmacao = confirm('Deseja realmente sair do sistema?');
    if (confirmacao) {
      this.router.navigate(['/']);
      sessionStorage.clear();
    }
  }

  onProfile(): void {
    console.log('Abrindo perfil...');
  }
}