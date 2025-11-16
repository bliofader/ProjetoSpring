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
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';
import { UsuarioService } from '../../../services/usuario.service';

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
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;

  alertaCampos = false;
  sucessoCadastro = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      dataNascimento: ['', [Validators.required, this.dataNaoFuturaValidator]],
      cpf: ['', [Validators.required, this.cpfValidoValidator]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      especialidade: [''],
      descricao: [''],
      redeSocial: ['']
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
      reader.onload = () => (this.previewImage = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onReset(): void {
    this.registrationForm.reset();
    this.selectedFile = null;
    this.previewImage = null;
    this.alertaCampos = false;
    this.sucessoCadastro = false;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.alertaCampos = true;
      this.sucessoCadastro = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const tipo = this.registrationForm.get('tipo')?.value;

    if (tipo === 'Personal') {
      if (!this.registrationForm.get('especialidade')?.value ||
          !this.registrationForm.get('descricao')?.value ||
          !this.registrationForm.get('redeSocial')?.value ||
          !this.selectedFile) {
        this.alertaCampos = true;
        this.sucessoCadastro = false;
        alert('Para cadastrar um Personal é obrigatório preencher os campos extras e enviar uma imagem.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    this.alertaCampos = false;

    const confirmacao = confirm('Deseja realmente cadastrar este usuário?');
    if (!confirmacao) return;

    const raw = this.registrationForm.getRawValue();

    let usuario: any = {
      nome: raw.nome,
      tipo: raw.tipo,
      dataNascimento: raw.dataNascimento,
      cpf: String(raw.cpf || '').replace(/\D/g, ''),
      email: raw.email,
      senha: raw.senha,
      imagePath: this.selectedFile ? this.selectedFile.name : null
    };

    if (tipo === 'Personal') {
  usuario = {
    ...usuario,
    especialidade: raw.especialidade,
    descricao: raw.descricao, // ✅ agora bate com o backend
    redeSocial: raw.redeSocial
  };
}


    const formData = new FormData();
    formData.append('usuario', new Blob([JSON.stringify(usuario)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile);
    }

    // ✅ Sempre usa create()
    this.usuarioService.create(formData).subscribe({
      next: () => {
        this.sucessoCadastro = true;
        this.alertaCampos = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.onReset();
      },
      error: (err: any) => {
        console.error('❌ Erro ao cadastrar usuário:', err);
        this.alertaCampos = true;
        this.sucessoCadastro = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  dataNaoFuturaValidator: ValidatorFn = (control: AbstractControl) => {
    const valor = control.value;
    if (!valor) return null;
    const data = new Date(valor);
    const hoje = new Date();
    return data > hoje ? { dataFutura: true } : null;
  };

  cpfValidoValidator: ValidatorFn = (control: AbstractControl) => {
    const masked = control.value || '';
    const cpf = String(masked).replace(/\D/g, '');

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

  limitarAno(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = input.value;

    const partes = valor.split('-');
    if (partes.length > 0) {
      let ano = partes[0];
      if (ano.length > 4) {
        ano = ano.substring(0, 4);
        partes[0] = ano;
        input.value = partes.join('-');
        this.registrationForm.get('dataNascimento')?.setValue(input.value, { emitEvent: false });
      }
    }
  }
}
