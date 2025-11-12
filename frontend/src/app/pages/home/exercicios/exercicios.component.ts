import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';
import { ExercicioService } from '../../../services/exercicio.service';
import { Exercicio } from '../../../entities/exercicio';

@Component({
  selector: 'app-admin-cadastro-exercicio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    RouterLink,
    HeaderTopComponent
  ],
  templateUrl: './exercicios.component.html',
  styleUrl: './exercicios.component.css'
})
export class AdminCadastroExercicioComponent implements OnInit {
  searchTerm = '';
  exercicios: Exercicio[] = [];

  constructor(
    private exercicioService: ExercicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exercicioService.listarExercicios().subscribe({
      next: (dados) => this.exercicios = dados,
      error: () => alert('Erro ao carregar exercícios.')
    });
  }

  onSearch() {
    console.log('Buscando por:', this.searchTerm);
  }

  editarExercicio(exercicio: Exercicio) {
    if (exercicio.id != null) {
      this.router.navigate(['/editar-exercicio', exercicio.id]);
    } else {
      alert('❌ ID do exercício está indefinido.');
    }
  }

  excluirExercicio(exercicio: Exercicio) {
    const confirmacao = confirm(`Deseja excluir o exercício ${exercicio.nome}?`);
    if (confirmacao && exercicio.id != null) {
      this.exercicioService.deletarExercicio(exercicio.id).subscribe({
        next: () => {
          this.exercicios = this.exercicios.filter((e) => e.id !== exercicio.id);
          alert('✅ Exercício excluído com sucesso!');
        },
        error: () => alert('❌ Erro ao excluir exercício.')
      });
    } else {
      alert('❌ ID do exercício está indefinido.');
    }
  }
}
