import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaService } from '../../../services/lista.service';
import { ExercicioService } from '../../../services/exercicio.service';
import { Exercicio } from '../../../entities/exercicio';
import { ListaDTO } from '../../../entities/lista-dto';
import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-criar-treino',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderUsuarioComponent, FooterComponent],
  templateUrl: './criar-treino.component.html',
  styleUrls: ['./criar-treino.component.css']
})
export class CriarTreinoComponent implements OnInit {
  lista: ListaDTO = {
    nome: '',
    descricao: '',
    data: new Date(),
    dia: '',
    usuarioId: 0,
    exercicioIds: []
  };

  exercicios: Exercicio[] = [];
  exercicioSelecionados: number[] = [];

  constructor(
    private listaService: ListaService,
    private exercicioService: ExercicioService,
    private router: Router
  ) {
    const id = sessionStorage.getItem('usuarioId');
    this.lista.usuarioId = id ? +id : 0;
  }

  ngOnInit(): void {
    this.exercicioService.getExercicios().subscribe({
      next: (res) => this.exercicios = res,
      error: (err) => console.error('Erro ao carregar exercícios', err)
    });
  }

handleCheckboxChange(event: Event, id?: number): void {
  if (id === undefined) return;
  const input = event.target as HTMLInputElement;
  this.onToggleExercicio(id, input.checked);
}


  onToggleExercicio(id: number, checked: boolean): void {
    if (checked) {
      this.exercicioSelecionados.push(id);
    } else {
      this.exercicioSelecionados = this.exercicioSelecionados.filter(e => e !== id);
    }
  }

  salvar(): void {
    this.lista.exercicioIds = this.exercicioSelecionados;

    this.listaService.criarLista(this.lista).subscribe({
      next: (novaLista) => this.router.navigate(['/user/lista/detalhes', novaLista.id]),
      error: (err) => console.error('Erro ao criar treino', err)
    });
  }
}
