import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exercicios.component.html',
  styleUrl: './exercicios.component.css'
})
export class AdminCadastroExercicioComponent {
  searchTerm = '';
  exercicios = [
    { nome: 'Costas', cargo: 'Personal', ativo: true },
    { nome: 'Pernas', cargo: 'Basic', ativo: true },
    { nome: 'Peito', cargo: 'Basic', ativo: true },
  ];

  onSearch() {
    console.log('Buscando por:', this.searchTerm);
  }

  excluirExercicio(exercicios: any) {
    this.exercicios = this.exercicios.filter((u) => u !== exercicios);
  }
}
