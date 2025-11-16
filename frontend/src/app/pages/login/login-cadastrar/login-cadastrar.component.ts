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
import { Router } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entities/usuario';

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
  emailDuplicado = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      dataNascimento: ['', [Validators.required, this.dataNaoFuturaValidator]],
      cpf: ['', [Validators.required, this.cpfMascaraMinimoValidator, this.cpfValidoValidator]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      // ✅ Campos extras para Personal com validações
      especialidade: ['', [Validators.maxLength(60)]],
      descricao: ['', [Validators.maxLength(300)]],
      redeSocial: ['', [Validators.maxLength(80)]]
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

  onEmailBlur(): void {
    const email = this.f['email'].value;
    if (email) {
      this.usuarioService.findAll().subscribe({
        next: (usuarios: Usuario[]) => {
          this.emailDuplicado = usuarios.some(u => u.email === email);
        },
        error: () => {
          console.warn('Não foi possível validar o e-mail.');
          this.emailDuplicado = false;
        }
      });
    }
  }

  onReset(): void {
    this.registrationForm.reset();
    this.previewImage = null;
    this.selectedFile = null;
    this.emailDuplicado = false;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid || this.emailDuplicado) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const tipo = this.registrationForm.get('tipo')?.value;

    if (tipo === 'Personal') {
      if (!this.registrationForm.get('especialidade')?.value ||
          !this.registrationForm.get('descricao')?.value ||
          !this.registrationForm.get('redeSocial')?.value ||
          !this.selectedFile) {
        alert('Para cadastrar um Personal é obrigatório preencher os campos extras e enviar uma imagem.');
        return;
      }
    }

    const confirmacao = confirm('Deseja realmente cadastrar este usuário?');
    if (!confirmacao) return;

    const raw = this.registrationForm.getRawValue();

    let usuario: any = {
      nome: raw.nome,
      tipo: raw.tipo,
      dataNascimento: raw.dataNascimento,
      cpf: String(raw.cpf || '').replace(/\D/g, ''), // ✅ remove máscara antes de enviar
      email: raw.email,
      senha: raw.senha,
      imagePath: this.selectedFile ? this.selectedFile.name : null
    };

    if (tipo === 'Personal') {
      usuario = {
        ...usuario,
        especialidade: raw.especialidade,
        descricao: raw.descricao,
        redeSocial: raw.redeSocial
      };
    }

    const formData = new FormData();
    formData.append('usuario', new Blob([JSON.stringify(usuario)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile);
    }

    this.usuarioService.create(formData).subscribe({
      next: () => {
        alert('✅ Usuário cadastrado com sucesso!');
        this.router.navigate(['/login-usuario']);
      },
      error: (err: any) => {
        console.error('❌ Erro ao cadastrar usuário:', err);
        alert(err?.error || 'Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      }
    });
  }

  // ✅ Validação de data
  dataNaoFuturaValidator: ValidatorFn = (control: AbstractControl) => {
    const valor = control.value;
    if (!valor) return null;
    const data = new Date(valor);
    const hoje = new Date();
    return data > hoje ? { dataFutura: true } : null;
  };

  // ✅ Validação de máscara mínima do CPF
  cpfMascaraMinimoValidator: ValidatorFn = (control: AbstractControl) => {
    const masked = control.value || '';
    return masked.length === 14 ? null : { cpfMinimo: true };
  };

  // ✅ Validação completa de CPF
  cpfValidoValidator: ValidatorFn = (control: AbstractControl) => {
    const masked = control.value || '';
    const cpf = String(masked).replace(/\D/g, '');

    if (!cpf) return null; // deixa o 'required' cuidar do vazio
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return { cpfInvalido: true };

    const calcDigito = (base: number) => {
      let soma = 0;
      for (let i = 0; i < base; i++) {
        soma += parseInt(cpf.charAt(i), 10) * (base + 1 - i);
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const dig1 = calcDigito(9);
    const dig2 = calcDigito(10);
    if (dig1 !== parseInt(cpf.charAt(9), 10) || dig2 !== parseInt(cpf.charAt(10), 10)) {
      return { cpfInvalido: true };
    }

    return null;
  };

  // ✅ Máscara em tempo real para CPF
  formatarCpf(event: Event): void {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '');
    if (digits.length > 11) digits = digits.substring(0, 11);

    let masked = digits;
    if (digits.length > 9) {
      masked = digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (digits.length > 6) {
      masked = digits.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (digits.length > 3) {
      masked = digits.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }

    input.value = masked;
    this.registrationForm.get('cpf')?.patchValue(masked, { emitEvent: false });
  }
}
