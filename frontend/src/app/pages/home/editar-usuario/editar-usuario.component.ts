import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entities/usuario';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css',
})
export class EditarUsuarioComponent implements OnInit {
  registrationForm!: FormGroup;
  usuarioId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: [
        '',
        [Validators.required, Validators.pattern(/^\d{11}$/)],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      senha: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(40)],
      ],
    });
  }
emailDuplicado = false;
  ngOnInit(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('🟢 ID recebido para edição:', this.usuarioId);

    this.usuarioService.findById(this.usuarioId).subscribe({
      next: (usuario: Usuario) => {
        console.log('🟢 Dados recebidos:', usuario);
        this.registrationForm.patchValue({
          nome: usuario.nome,
          tipo: usuario.tipo,
          dataNascimento: usuario.dataNascimento,
          cpf: usuario.cpf,
          email: usuario.email,
          senha: '' // não preenche senha por segurança
        });
      },
      error: () => {
        alert('Erro ao carregar dados do usuário.');
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

 onSubmit(): void {
  console.log('📤 Submissão iniciada');
  if (this.registrationForm.invalid) {
    this.registrationForm.markAllAsTouched();
    return;
  }

  const confirmacao = confirm('Deseja salvar as alterações deste usuário?');
  if (!confirmacao) return;

  this.emailDuplicado = false; // resetar antes de enviar

  this.usuarioService.atualizarUsuario(this.usuarioId, this.registrationForm.value).subscribe({
    next: () => {
      alert('Usuário atualizado com sucesso!');
      this.registrationForm.reset();
    },
    error: (err) => {
      if (err.status === 400 && err.error?.message?.includes('E-mail já está em uso')) {
        this.emailDuplicado = true;
      } else {
        alert('Erro ao atualizar usuário.');
        console.error(err);
      }
    }
  });
}


}
