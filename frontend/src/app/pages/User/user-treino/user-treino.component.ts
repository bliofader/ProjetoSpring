import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListaService } from '../../../services/lista.service';
import { Lista } from '../../../entities/lista';
import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';
import { UserSideabrComponent } from '../../../components/UserComponents/user-sideabr/user-sideabr.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-user-treinos',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderUsuarioComponent,
    UserSideabrComponent
  ],
  templateUrl: './user-treino.component.html',
  styleUrls: ['./user-treino.component.css']
})
export class UserTreinosComponent implements OnInit {
  listas: Lista[] = [];
  listasFiltradas: Lista[] = [];
  diasSemana: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  diaSelecionado: string | null = null;

  constructor(private listaService: ListaService, private router: Router) {}

  ngOnInit(): void {
    this.listaService.listarPorUsuario().subscribe({
      next: (res) => {
        this.listas = res;
        this.listasFiltradas = res;
      },
      error: (err) => console.error('Erro ao carregar listas', err)
    });
  }

  filtrarPorDia(dia: string): void {
    this.diaSelecionado = dia;
    this.listasFiltradas = this.listas.filter(lista =>
      lista.dia?.toLowerCase() === dia.toLowerCase()
    );
  }

  limparFiltro(): void {
    this.diaSelecionado = null;
    this.listasFiltradas = this.listas;
  }

  goToDetalhesLista(id?: number): void {
  if (id !== undefined) {
    this.router.navigate(['/user/lista/detalhes', id]); // ✅ rota correta
  }
}


  goToCriarLista(): void {
    this.router.navigate(['/user/treino/criar']);
  }
  
}
