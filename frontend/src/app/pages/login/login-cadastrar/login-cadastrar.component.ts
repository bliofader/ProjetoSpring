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

@Component({
  selector: 'app-login-cadastrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, HeaderTopComponent],
  templateUrl: './login-cadastrar.component.html',
  styleUrl: './login-cadastrar.component.css',
})
export class LoginCadastrarComponent {
  registrationForm!: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{11}$/), // apenas números, 11 dígitos
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      senha: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(40)],
      ],
      imagePath: [null, Validators.required],
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
      console.log('✅ Usuário cadastrado:', this.registrationForm.value);
      alert('Usuário cadastrado com sucesso!');
      this.registrationForm.reset();
    }
  }
}