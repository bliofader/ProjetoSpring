import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginAdminComponent {
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
      this.router.navigate(['/admin']);
    } else {
      alert('E-mail ou senha incorretos.');
    }
  }
}

