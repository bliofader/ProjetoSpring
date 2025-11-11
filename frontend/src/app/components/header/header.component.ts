import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthService) {
    console.log('Perfil:', sessionStorage.getItem('usuarioPerfil'));
    console.log('É admin?', this.authService.isAdmin());
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login-usuario';
  }
}
