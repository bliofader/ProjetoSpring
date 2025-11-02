import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, NavbarComponent, FooterComponent, RouterLink, HeaderTopComponent ],
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

  onSearch() {
    console.log('Buscando por:', this.searchTerm);
  }
  editarExercicio(exercicio: any) {
  console.log('Editando exercício:', exercicio);
  // Aqui você pode abrir um modal, ou redirecionar para outra rota de edição
}

  excluirExercicio(exercicios: any) {
  const confirmacao = confirm(`Deseja excluir o exercício ${exercicios.Nome}?`);
  if (confirmacao) {
    this.exercicios = this.exercicios.filter((u) => u !== exercicios);
  }
}
}