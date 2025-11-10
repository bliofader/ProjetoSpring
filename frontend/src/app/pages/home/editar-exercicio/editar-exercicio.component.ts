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
  selector: 'app-editar-exercicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent, HeaderTopComponent],
  templateUrl: './editar-exercicio.component.html',
  styleUrl: './editar-exercicio.component.css',
})
export class EditarExercicioComponent {
  exercicioForm!: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.exercicioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      nivel: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
      videoUrl: ['', [Validators.pattern('^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.*$')]],
      imagePath: [null, Validators.required]
    });
  }

  // Getter para facilitar acesso aos campos no HTML
  get f() {
    return this.exercicioForm.controls;
  }

  //  Método para capturar o arquivo selecionado
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

  //  Envio do formulário
  onSubmit(): void {
    if (this.exercicioForm.invalid) {
      this.exercicioForm.markAllAsTouched();
      return;
    }

    console.log('Dados do exercício:', this.exercicioForm.value);

    if (this.selectedFile) {
      console.log('Arquivo selecionado:', this.selectedFile.name);
    }
  }
}