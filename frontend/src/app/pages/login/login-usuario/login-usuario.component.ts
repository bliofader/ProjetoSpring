import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../Models/login-request.model';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
    this.authService.salvarToken(res.token, res.usuarioId, res.nomeUsuario, res.perfil);
    console.log('Perfil salvo:', sessionStorage.getItem('usuarioPerfil'));
    alert('Login realizado com sucesso!');

    const perfil = sessionStorage.getItem('usuarioPerfil');
    if (perfil?.toLowerCase() === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user/home']);
    }
  },
  error: () => {
    alert('E-mail ou senha incorretos.');
  }
});

  }
}
