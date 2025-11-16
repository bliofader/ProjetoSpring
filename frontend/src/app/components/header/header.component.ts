import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {
    console.log('Perfil:', sessionStorage.getItem('usuarioPerfil'));
    console.log('É admin?', this.authService.isAdmin());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // ✅ redireciona para Home
  }
}
