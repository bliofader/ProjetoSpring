import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-cadastrarusuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, FooterComponent, RouterLink, HeaderComponent],
  templateUrl: './cadastrarexercicios.component.html',
  styleUrl: './cadastrarexercicios.component.css',
})
export class CadastrarExercicioComponent {
  registrationForm!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      foto: [null], // novo campo para imagem
    });
  }

  // Captura o arquivo e gera preview
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    // Verifica se é uma imagem
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecione um arquivo de imagem (JPEG ou PNG).');
      this.registrationForm.patchValue({ foto: null });
      this.selectedImage = null;
      return;
    }

    // Atualiza o campo "foto" do form
    this.registrationForm.patchValue({ foto: file });

    // Gera o preview
    const reader = new FileReader();
    reader.onload = () => (this.selectedImage = reader.result);
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      alert('⚠️ Existem campos inválidos ou não preenchidos. Verifique o formulário.');
      return;
    }

    const confirmacao = confirm('Deseja realmente cadastrar este usuário?');
    if (confirmacao) {
      const formData = new FormData();

      // Adiciona todos os campos do formulário
      Object.entries(this.registrationForm.value).forEach(([key, value]) => {
        if (value instanceof Blob || typeof value === 'string') {
          formData.append(key, value);
        }
      });

      console.log('✅ Dados enviados:', this.registrationForm.value);
      alert('Usuário cadastrado com sucesso!');
      this.registrationForm.reset();
      this.selectedImage = null;
    }
  }
}
