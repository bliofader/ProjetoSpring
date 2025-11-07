import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExercicioService } from '../../../services/exercicio.service';
import { Exercicio } from '../../../entities/exercicio';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipes';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-tela-exercicio-detalhes',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, SafeUrlPipe],
  templateUrl: './tela-exercicio-detalhes.component.html',
  styleUrl: './tela-exercicio-detalhes.component.css'
})
export class TelaExercicioDetalhesComponent implements OnInit {
  exercicio: Exercicio | null = null;
  loading = true;
  erro = false;


  constructor(
    private route: ActivatedRoute,
    private exercicioService: ExercicioService
  ) {}



ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.exercicioService.buscarPorId(+id).subscribe({
      next: (res) => {
        this.exercicio = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar exercício', err);
        this.erro = true;
        this.loading = false;
      }
    });
  }
}

}
