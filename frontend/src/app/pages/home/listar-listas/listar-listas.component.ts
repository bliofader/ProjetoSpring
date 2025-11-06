import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';

@Component({
  selector: 'app-listar-listas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent, HeaderTopComponent ],
  templateUrl: './listar-listas.component.html',
  styleUrl: './listar-listas.component.css'
})
export class ListarListaComponent {
  searchTerm = '';
  listas = [
    { ID: '1', Nome: 'Lista 1', Data: '06/06/1993', Dia: 'Segunda-feira', Exercicios: 'Supino Invertido' },
    { ID: '2', Nome: 'Lista 2', Data: '12/12/2005', Dia: 'Quarta-feira', Exercicios: 'Agachamento' },
    { ID: '3', Nome: 'Lista 3', Data: '13/04/2003', Dia: 'Sexta-feira', Exercicios: 'Puxada Frontal' },
  ];

    // 2. Injete o Router no construtor
    constructor(private router: Router) {}

  onSearch() {
    console.log('Buscando por:', this.searchTerm);
  }
  // 3. Atualize o método para usar o router
  editarLista(lista: any) {
    console.log('Redirecionando para a página de edição. Dados do exercício (não enviados):', lista);
    
    // Navega para a rota estática 'editar-exercicio'
    // A barra '/' no início garante que a navegação seja a partir da raiz.
    this.router.navigate(['/editar-lista']);
  }

excluirlista(lista: any) {
  const confirmacao = confirm(`Deseja excluir a lista ${lista.Nome}?`);
  if (confirmacao) {
    this.listas = this.listas.filter((u) => u !== lista);
  }
}
}
