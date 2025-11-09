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

  //banco temporario
  exercicios: Exercicio[] = [
    { nome: 'Agachamento Livre', agrupamento: 'pernas', imagePath: 'assets/images/pernas.png', tipo: 'força', descricao: 'Exercício básico para o desenvolvimento dos músculos das pernas e glúteos.', nivel: 'básico', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Leg Press', agrupamento: 'quadriceps', imagePath: 'assets/images/pernas.png', tipo: 'força', descricao: 'Exercício básico para o desenvolvimento dos músculos das pernas e glúteos.', nivel: 'intermediário', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Panturrilha em Pé', agrupamento: 'panturrilha', imagePath: 'assets/images/pernas.png', tipo: 'resistência', descricao: 'Exercício básico para o desenvolvimento dos músculos das pernas e glúteos.', nivel: 'básico', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Supino Reto', agrupamento: 'peito', imagePath: 'assets/images/pernas.png', tipo: 'força', descricao: 'Exercício básico para o desenvolvimento dos músculos do peitoral e tríceps.', nivel: 'intermediário', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Remada Curvada', agrupamento: 'costas', imagePath: 'assets/images/pernas.png', tipo: 'força', descricao: 'Exercício básico para o fortalecimento dos músculos das costas e bíceps.', nivel: 'avançado', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Elevação Lateral', agrupamento: 'ombro', imagePath: 'assets/images/pernas.png', tipo: 'isolado', descricao: 'Exercício básico para o desenvolvimento dos músculos laterais dos ombros.', nivel: 'intermediário', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Prancha Abdominal', agrupamento: 'abs', imagePath: 'assets/images/pernas.png', tipo: 'resistência', descricao: 'Exercício básico para o fortalecimento do abdômen e estabilidade corporal.', nivel: 'básico', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Tríceps Corda', agrupamento: 'triceps', imagePath: 'assets/images/pernas.png', tipo: 'isolado', descricao: 'Exercício básico para o fortalecimento e definição do tríceps.', nivel: 'intermediário', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Rosca Direta', agrupamento: 'biceps', imagePath: 'assets/images/pernas.png', tipo: 'isolado', descricao: 'Exercício básico para o desenvolvimento dos músculos do bíceps.', nivel: 'básico', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' },
    { nome: 'Rosca Alternada', agrupamento: 'biceps', imagePath: 'assets/images/pernas.png', tipo: 'isolado', descricao: 'Exercício básico para o fortalecimento e simetria dos músculos do bíceps.', nivel: 'intermediário', videoUrl: 'https://www.youtube.com/embed/86ZW7tmmLuU?si=H6zrJ3uIFWE0d6YQ' }

  ];



  filteredExercicios = [...this.exercicios];

  ngOnInit() { }

 filterExercises(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredExercicios = this.exercicios;
    } else {
      this.filteredExercises = this.exercises.filter(
        (exercicio) => exercicio.agrupamento.toLowerCase() === category.toLowerCase()
      );
    }
  }
}
