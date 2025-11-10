import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalService } from '../../../services/personal.service';
import { HeaderPersonalComponent } from '../../../components/header-personal/header-personal.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Personal } from '../../../entities/personal';

@Component({
  selector: 'app-lista-personais-detalhes',
  standalone: true,
  imports: [HeaderPersonalComponent, FooterComponent, CommonModule],
  templateUrl: './lista-personais-detalhes.component.html',
  styleUrl: './lista-personais-detalhes.component.css'
})
export class ListaPersonaisDetalhesComponent implements OnInit {
  personal!: Personal;
  isLoading = true;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private personalService: PersonalService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.personalService.getPersonalById(id).subscribe({
      next: (data) => {
        this.personal = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar personal:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
