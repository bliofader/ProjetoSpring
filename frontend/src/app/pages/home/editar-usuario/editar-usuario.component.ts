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
  emailDuplicado = false;
  selectedFile: File | null = null;
  emailOriginal = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
  }

  ngOnInit(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.findById(this.usuarioId).subscribe({
      next: (usuario: Usuario) => {
        this.emailOriginal = usuario.email;
        this.registrationForm.patchValue({
          nome: usuario.nome,
          tipo: usuario.tipo,
          email: usuario.email,
          senha: ''
        });
      },
      error: () => alert('Erro ao carregar dados do usuário.')
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onEmailBlur(): void {
    const email = this.f['email'].value;
    if (email && email !== this.emailOriginal) {
      this.usuarioService.findAll().subscribe({
        next: (usuarios: Usuario[]) => {
          const existe = usuarios.some(u => u.email === email && u.id !== this.usuarioId);
          this.emailDuplicado = existe;
        },
        error: () => {
          console.warn('Não foi possível validar o e-mail.');
          this.emailDuplicado = false;
        }
      });
    } else {
      this.emailDuplicado = false;
    }
  }

  onSubmit(): void {
    if (this.registrationForm.invalid || this.emailDuplicado) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const confirmacao = confirm('Deseja salvar as alterações deste usuário?');
    if (!confirmacao) return;

    const usuario = this.registrationForm.getRawValue();
    const formData = new FormData();
    formData.append('usuario', new Blob([JSON.stringify(usuario)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile);
    }

    this.usuarioService.updateComImagem(this.usuarioId, formData).subscribe({
      next: () => {
        alert('✅ Usuário atualizado com sucesso!');
        this.registrationForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        alert('❌ Erro ao atualizar usuário.');
        console.error(err);
      }
    });
  }
}
