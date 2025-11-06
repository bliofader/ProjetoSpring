import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { RouterLink } from '@angular/router';

import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { HeaderTopComponent } from '../../../components/headertop/headertop.component';

@Component({
  selector: 'app-listar-listas',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterOutlet, FooterComponent, RouterLink, NavbarComponent, HeaderTopComponent ],
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

  onSearch() {
    console.log('Buscando por:', this.searchTerm);
  }
  editarLista(lista: any) {
  console.log('Editando lista:', lista);
  // Aqui você pode abrir um modal, ou redirecionar para outra rota de edição
}

excluirlista(lista: any) {
  const confirmacao = confirm(`Deseja excluir a lista ${lista.Nome}?`);
  if (confirmacao) {
    this.listas = this.listas.filter((u) => u !== lista);
  }
}
}

