import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login-cadastrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, HeaderTopComponent],
  templateUrl: './login-cadastrar.component.html',
  styleUrls: ['./login-cadastrar.component.css'],
})
export class LoginCadastrarComponent {
  registrationForm!: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      dataNascimento: ['', [Validators.required, this.dataNaoFuturaValidator]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/), this.cpfValidoValidator]],
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

    const usuario = this.registrationForm.getRawValue();
    const formData = new FormData();
    formData.append('usuario', new Blob([JSON.stringify(usuario)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile);
    }

    this.usuarioService.create(formData).subscribe({
      next: () => {
        alert('✅ Usuário cadastrado com sucesso!');
        this.onReset();
      },
      error: (err: any) => {
        console.error('❌ Erro ao cadastrar usuário:', err);
        alert(err?.error || 'Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      }
    });
  }

  dataNaoFuturaValidator: ValidatorFn = (control: AbstractControl) => {
    const data = new Date(control.value);
    const hoje = new Date();
    return data > hoje ? { dataFutura: true } : null;
  };

  cpfValidoValidator: ValidatorFn = (control: AbstractControl) => {
    const cpf = control.value;
    if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return { cpfInvalido: true };

    const calcDigito = (base: number) => {
      let soma = 0;
      for (let i = 0; i < base; i++) {
        soma += parseInt(cpf.charAt(i)) * (base + 1 - i);
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const dig1 = calcDigito(9);
    const dig2 = calcDigito(10);
    if (dig1 !== parseInt(cpf.charAt(9)) || dig2 !== parseInt(cpf.charAt(10))) {
      return { cpfInvalido: true };
    }

    return null;
  };
}
