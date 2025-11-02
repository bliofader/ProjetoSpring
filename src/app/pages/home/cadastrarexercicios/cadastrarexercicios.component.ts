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

@Component({
  selector: 'app-cadastrar-exercicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent, HeaderTopComponent],
  templateUrl: './cadastrarexercicios.component.html',
  styleUrl: './cadastrarexercicios.component.css',
})
export class CadastrarExerciciosComponent {
  exercicioForm!: FormGroup;
  previewImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.exercicioForm = this.fb.group({
      id: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(10)],
      ],
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      nivel: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
      imagePath: [null, Validators.required],
      videoUrl: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
          ),
        ],
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.exercicioForm.controls;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecione uma imagem válida (JPG ou PNG).');
      this.exercicioForm.patchValue({ imagePath: null });
      this.previewImage = null;
      return;
    }

    this.exercicioForm.patchValue({ imagePath: file });
    const reader = new FileReader();
    reader.onload = () => (this.previewImage = reader.result);
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.exercicioForm.invalid) {
      this.exercicioForm.markAllAsTouched();
      alert('⚠️ Corrija os campos inválidos antes de continuar.');
      return;
    }

    const confirmacao = confirm('Deseja cadastrar este exercício?');
    if (confirmacao) {
      console.log('✅ Exercício cadastrado:', this.exercicioForm.value);
      alert('Exercício cadastrado com sucesso!');
      this.exercicioForm.reset();
      this.previewImage = null;
    }
  }
}
