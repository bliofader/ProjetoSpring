import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListaService } from '../../../services/lista.service';
import { Lista } from '../../../entities/lista';

@Component({
  selector: 'app-detalhes-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes-lista.component.html',
  styleUrls: ['./detalhes-lista.component.css']
})
export class DetalhesListaComponent implements OnInit {
  lista?: Lista;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listaService: ListaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recebido:', id); // ✅ debug
    this.listaService.buscarPorId(id).subscribe({
      next: (res) => {
        console.log('Lista recebida:', res); // ✅ debug
        this.lista = res;
      },
      error: (err) => console.error('Erro ao carregar detalhes da lista', err)
    });
  }

  voltar(): void {
    this.router.navigate(['/user/treinos']);
  }
}
