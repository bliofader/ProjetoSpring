import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../Models/login-request.model';
@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent {
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credenciais: LoginRequest = {
      email: this.email,
      senha: this.senha
    };

    this.authService.login(credenciais).subscribe({
      next: (res) => {
        this.authService.salvarToken(res.token, res.usuarioId, res.nomeUsuario, res.tipo);
        alert('Login realizado com sucesso!');
        this.router.navigate(['/tela-personal']);
      },
      error: () => {
        alert('E-mail ou senha incorretos.');
      }
    });
  }
}
