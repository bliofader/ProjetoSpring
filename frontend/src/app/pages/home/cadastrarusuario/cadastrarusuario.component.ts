import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entities/usuario';

@Component({
  selector: 'app-cadastrarusuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    HeaderTopComponent,
  ],
  templateUrl: './cadastrarusuario.component.html',
  styleUrl: './cadastrarusuario.component.css',
})
export class CadastrarUsuarioComponent {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const confirmacao = confirm('Deseja realmente cadastrar este usuário?');
    if (confirmacao) {
      const novoUsuario: Usuario = this.registrationForm.value;

      this.usuarioService.create(novoUsuario).subscribe({
        next: () => {
          alert('Usuário cadastrado com sucesso!');
          this.registrationForm.reset();
        },
        error: () => {
          alert('Erro ao cadastrar usuário.');
        }
      });
    }
  }
}
