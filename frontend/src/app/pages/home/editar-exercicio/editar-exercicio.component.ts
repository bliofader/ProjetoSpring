import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';
import { ExercicioService } from '../../../services/exercicio.service';
import { Exercicio } from '../../../entities/exercicio';

@Component({
  selector: 'app-editar-exercicio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    HeaderTopComponent
  ],
  templateUrl: './editar-exercicio.component.html',
  styleUrl: './editar-exercicio.component.css',
})
export class EditarExercicioComponent implements OnInit {
  exercicioForm!: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  exercicioId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private exercicioService: ExercicioService
  ) {
    this.exercicioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      tipo: ['', Validators.required],
      agrupamento: ['', Validators.required],
      nivel: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
      videoUrl: ['', [Validators.pattern('^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.*$')]],
      imagePath: [null]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      alert('ID do exercício não informado.');
      this.router.navigate(['/exercicios']);
      return;
    }

    this.exercicioId = Number(idParam);
    this.exercicioService.buscarPorId(this.exercicioId).subscribe({
      next: (exercicio: Exercicio) => {
        this.exercicioForm.patchValue({
          nome: exercicio.nome,
          tipo: exercicio.tipo,
          agrupamento: exercicio.agrupamento,
          nivel: exercicio.nivel,
          descricao: exercicio.descricao,
          videoUrl: exercicio.videoUrl
        });
        this.previewImage = `http://localhost:8080/uploads/${exercicio.imagePath}`;
      },
      error: () => alert('Erro ao carregar exercício.')
    });
  }

  get f(): { [key: string]: AbstractControl } {
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
    if (this.exercicioForm.invalid) {
      this.exercicioForm.markAllAsTouched();
      return;
    }

    const confirmacao = confirm('Deseja salvar as alterações?');
    if (!confirmacao) return;

    const formData = new FormData();
    const exercicio = this.exercicioForm.getRawValue();

    formData.append('nome', exercicio.nome);
    formData.append('tipo', exercicio.tipo);
    formData.append('agrupamento', exercicio.agrupamento);
    formData.append('nivel', exercicio.nivel);
    formData.append('descricao', exercicio.descricao);
    formData.append('videoUrl', exercicio.videoUrl || '');
    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile);
    }

    this.exercicioService.atualizarExercicio(this.exercicioId, formData).subscribe({
      next: () => {
        this.router.navigate(['/exercicios'], {
          state: { mensagem: '✅ Exercício atualizado com sucesso!' }
        });
      },
      error: () => alert('❌ Erro ao atualizar exercício.')
    });
  }
}
