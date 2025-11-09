import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// 1. Importe o Router
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent, HeaderTopComponent ],
  templateUrl: './exercicios.component.html',
  styleUrl: './exercicios.component.css'
})
export class AdminCadastroExercicioComponent {
  searchTerm = '';
  exercicios = [
    { ID: 1, Nome: 'Costas', Tipo: 'Personal', Agrupamento: 'a', Nivel: 'Avançado', Descricao: 'Exercício de costas', ativo: true },
    { ID: 2, Nome: 'Peito', Tipo: 'Personal', Agrupamento: 'b', Nivel: 'Básico', Descricao: 'Exercício de costas', inativo: true },
    { ID: 3, Nome: 'Pernas', Tipo: 'Personal', Agrupamento: 'c', Nivel: 'Intermediário', Descricao: 'Exercício de costas', ativo: true },
  ];

  // 2. Injete o Router no construtor
  constructor(private router: Router) {}

  onSearch() {
    console.log('Buscando por:', this.searchTerm);
  }

  // 3. Atualize o método para usar o router
  editarExercicio(exercicio: any) {
    console.log('Redirecionando para a página de edição. Dados do exercício (não enviados):', exercicio);
    
    // Navega para a rota estática 'editar-exercicio'
    // A barra '/' no início garante que a navegação seja a partir da raiz.
    this.router.navigate(['/editar-exercicio']);
  }

  excluirExercicio(exercicios: any) {
    const confirmacao = confirm(`Deseja excluir o exercício ${exercicios.Nome}?`);
    if (confirmacao) {
      this.exercicios = this.exercicios.filter((u) => u !== exercicios);
    }
  }
}