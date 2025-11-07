import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';
import { ExercicioService } from '../../../services/exercicio.service';

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
  selectedFile: File | null = null;
  imagemInvalida = false;

  constructor(private fb: FormBuilder, private exercicioService: ExercicioService) {
    this.exercicioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      agrupamento: ['', Validators.required],
      nivel: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
      videoUrl: ['', [Validators.pattern('^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.*$')]]
    });
  }

  get f() {
    return this.exercicioForm.controls;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
      this.previewImage = null;
      this.imagemInvalida = true;
      return;
    }

    this.selectedFile = input.files[0];
    this.imagemInvalida = false;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit(): void {
    this.imagemInvalida = !this.selectedFile;

    if (this.exercicioForm.invalid || this.imagemInvalida) {
      this.exercicioForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('nome', this.exercicioForm.value.nome);
    formData.append('tipo', this.exercicioForm.value.tipo);
    formData.append('agrupamento', this.exercicioForm.value.agrupamento);
    formData.append('nivel', this.exercicioForm.value.nivel);
    formData.append('descricao', this.exercicioForm.value.descricao);
    formData.append('videoUrl', this.exercicioForm.value.videoUrl || '');

    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile);
    }

    this.exercicioService.cadastrarExercicio(formData).subscribe({
      next: res => {
        alert('Exercício cadastrado com sucesso!');
        this.exercicioForm.reset();
        this.previewImage = null;
        this.selectedFile = null;
        this.imagemInvalida = false;
      },
      error: err => {
        console.error('Erro ao cadastrar exercício', err);
        alert('Erro ao cadastrar exercício.');
      }
    });
  }
}
