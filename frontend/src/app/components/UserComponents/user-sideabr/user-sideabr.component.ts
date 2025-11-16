import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ importar CommonModule
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-sideabr',
  standalone: true,
  imports: [RouterLink, CommonModule], // ✅ adicionar CommonModule
  templateUrl: './user-sideabr.component.html',
  styleUrls: ['./user-sideabr.component.css']
})
export class UserSideabrComponent {
  isPersonal: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    const usuario = this.authService.getUsuario();
    this.isPersonal = usuario?.perfil?.toLowerCase() === 'personal';
    console.log('Usuário logado:', usuario); // ✅ debug para verificar perfil
  }
}
