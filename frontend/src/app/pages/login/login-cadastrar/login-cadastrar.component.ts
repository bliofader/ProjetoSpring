import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entities/usuario';

@Component({
  selector: 'app-login-cadastrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, HeaderTopComponent],
  templateUrl: './login-cadastrar.component.html',
  styleUrls: ['./login-cadastrar.component.css'], // ✅ corrigido
})
export class LoginCadastrarComponent {
  registrationForm!: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onReset(): void {
    this.registrationForm.reset();
    this.previewImage = null;
    this.selectedFile = null;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const confirmacao = confirm('Deseja realmente cadastrar este usuário?');
    if (!confirmacao) return;

    const usuario: Usuario = this.registrationForm.getRawValue() as Usuario;

    const request = this.selectedFile
      ? this.usuarioService.createComImagem(usuario, this.selectedFile)
      : this.usuarioService.createSemImagem(usuario);

    request.subscribe({
      next: () => {
        alert('✅ Usuário cadastrado com sucesso!');
        this.onReset();
      },
      error: (err) => {
        console.error('❌ Erro ao cadastrar usuário:', err);
        alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      }
    });
  }
}
