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
  diasSemana: string[] = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo'
];
  salvando = false;
  confirmacao = false;

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

  /** Alterna seleção de exercício ao clicar no item da lista */
  toggleExercicio(id: number): void {
    if (this.exercicioSelecionados.includes(id)) {
      this.exercicioSelecionados = this.exercicioSelecionados.filter(e => e !== id);
    } else {
      this.exercicioSelecionados.push(id);
    }
  }

  salvar(): void {
    if (this.salvando) return;
    this.salvando = true;

    if (!this.lista.nome || !this.lista.dia || this.exercicioSelecionados.length === 0) {
      alert('Preencha todos os campos e selecione pelo menos um exercício.');
      this.salvando = false;
      return;
    }

    this.lista.exercicioIds = this.exercicioSelecionados;

    this.listaService.criarLista(this.lista).subscribe({
      next: () => {
        this.confirmacao = true;
        setTimeout(() => {
          this.router.navigate(['/user/treinos']);
        }, 1500);
      },
      error: (err) => {
        console.error('Erro ao criar treino', err);
        this.salvando = false;
      }
    });
  }
}
