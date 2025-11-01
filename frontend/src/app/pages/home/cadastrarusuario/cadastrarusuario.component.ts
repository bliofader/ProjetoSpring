import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrarusuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrarusuario.component.html',
  styleUrl: './cadastrarusuario.component.css',
})
export class CadastrarUsuarioComponent {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.maxLength(11), this.cpfValidator]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  cpfValidator(control: AbstractControl): { [key: string]: any } | null {
    const cpf = (control.value || '').replace(/\D/g, '');
    if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return { cpfInvalido: true };

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return { cpfInvalido: true };

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return { cpfInvalido: true };

    return null;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      alert('⚠️ Existem campos inválidos ou não preenchidos. Verifique o formulário.');
      return;
    }

    const confirmacao = confirm('Deseja realmente cadastrar este usuário?');
    if (confirmacao) {
      console.log('✅ Usuário cadastrado:', this.registrationForm.value);
      alert('Usuário cadastrado com sucesso!');
      this.registrationForm.reset();
      this.submitted = false;
    } else {
      alert('Ação cancelada pelo usuário.');
    }
  }
}
