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

  constructor(private fb: FormBuilder, private exercicioService: ExercicioService) {
    this.exercicioForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      agrupamento: ['', Validators.required],
      nivel: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
      videoUrl: ['', [Validators.pattern('^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.*$')]],
      imagePath: [null, Validators.required]
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
      return;
    }

    this.selectedFile = input.files[0];
    this.exercicioForm.patchValue({ imagePath: this.selectedFile });

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit(): void {
    console.log('Formulário enviado');

    if (this.exercicioForm.invalid || !this.selectedFile) {
      this.exercicioForm.markAllAsTouched();
      console.warn('Formulário inválido ou imagem não selecionada');
      return;
    }

    const formData = new FormData();
    formData.append('id', this.exercicioForm.value.id);
    formData.append('nome', this.exercicioForm.value.nome);
    formData.append('tipo', this.exercicioForm.value.tipo);
    formData.append('agrupamento', this.exercicioForm.value.agrupamento);
    formData.append('nivel', this.exercicioForm.value.nivel);
    formData.append('descricao', this.exercicioForm.value.descricao);
    formData.append('videoUrl', this.exercicioForm.value.videoUrl || '');
    formData.append('imagePath', this.selectedFile);

    for (const pair of (formData as any).entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
    

    this.exercicioService.cadastrarExercicio(formData).subscribe({
      next: res => console.log('Exercício cadastrado com sucesso!', res),
      error: err => console.error('Erro ao cadastrar exercício', err)
    });
  }
}
