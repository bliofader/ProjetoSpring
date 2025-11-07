import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { ExercicioService } from '../../../services/exercicio.service';
import { Exercicio } from '../../../entities/exercicio';

@Component({
  selector: 'app-tela-exercicio',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FooterComponent, RouterModule],
  templateUrl: './tela-exercicio.component.html',
  styleUrl: './tela-exercicio.component.css'
})
export class TelaExercicioComponent implements OnInit {
  selectedCategory: string = 'all';
  exercises: Exercicio[] = [];
  filteredExercises: Exercicio[] = [];

  constructor(private exercicioService: ExercicioService) {}

  ngOnInit(): void {
    this.exercicioService.listarExercicios().subscribe({
      next: (res) => {
        this.exercises = res;
        this.filteredExercises = res;
      },
      error: (err) => {
        console.error('Erro ao carregar exercícios', err);
      }
    });
  }

  filterExercises(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredExercises = this.exercises;
    } else {
      this.filteredExercises = this.exercises.filter(
        (exercicio) => exercicio.agrupamento.toLowerCase() === category.toLowerCase()
      );
    }
  }
}
