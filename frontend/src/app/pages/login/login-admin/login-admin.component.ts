import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ✅ IMPORTANTE
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../Models/login-request.model';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule, RouterModule], // ✅ ADICIONADO RouterModule
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  email = '';
  senha = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const credenciais: LoginRequest = {
      email: this.email,
      senha: this.senha
    };

    this.authService.login(credenciais).subscribe({
      next: (res) => {
        this.authService.salvarToken(res.token, res.usuarioId, res.nomeUsuario, res.tipo);
        alert('Login realizado com sucesso!');
      },
      error: () => {
        alert('E-mail ou senha incorretos.');
      }
    });
  }
}
