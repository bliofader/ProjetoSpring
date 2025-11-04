import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { merge } from 'rxjs';

@Component({
  selector: 'app-login-personal',
  standalone: true,
  templateUrl: './login-personal.component.html',
  styleUrl: './login-personal.component.css',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPersonalComponent {
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
      localStorage.setItem('usuarioNome', usuarioValido.nome); // salva o nome no navegador
      this.router.navigate(['/usuario']);
    } else {
      alert('E-mail ou senha incorretos.');
    }
  }
}