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

  constructor(private listaService: ListaService, private router: Router) {}

  ngOnInit(): void {
    this.listaService.listarPorUsuario().subscribe({
      next: (res) => this.listas = res,
      error: (err) => console.error('Erro ao carregar listas', err)
    });
  }

  goToDetalhesLista(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/user/lista/detalhes', id]);
    }
  }

  goToCriarLista(): void {
  this.router.navigate(['/user/treino/criar']);
}

}
