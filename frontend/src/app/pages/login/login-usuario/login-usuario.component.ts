import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {
  email = '';
  senha = '';

  // simulação de "usuários cadastrados"
  usuarios = [
    { nome: "icaro", email: 'icaro.123@gmail.com', senha: 'icaro123' },
    { nome: "luiza", email: 'maria.123@gmail.com', senha: 'maria123' },
    { nome: "ellen", email: 'ellen.123@gmail.com', senha: 'ellen123' }
  ];

  constructor(private router: Router) { }

  onSubmit() {
    const usuarioValido = this.usuarios.find(
      (u) => u.email === this.email && u.senha === this.senha
    );

    if (usuarioValido) {
      alert('Login realizado com sucesso!');
      localStorage.setItem('usuarioNome', usuarioValido.nome);
      this.router.navigate(['/user/home']); //mudar caminho
    } else {
      alert('E-mail ou senha incorretos.');
    }
  }
}