import { Component, OnInit } from '@angular/core';
import { Personal } from '../../../entities/personal';
import { HeaderPersonalComponent } from '../../../components/header-personal/header-personal.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonalService } from '../../../services/personal.service';

@Component({
  selector: 'app-lista-personais',
  standalone: true,
  imports: [HeaderPersonalComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './lista-personais.component.html',
  styleUrl: './lista-personais.component.css'
})
export class ListaPersonaisComponent implements OnInit {
  personais: Personal[] = [];
  isLoading = true;
  hasError = false;

  constructor(private personalService: PersonalService) {}

  ngOnInit(): void {
    this.personalService.getAllPersonais().subscribe({
      next: (data) => {
        this.personais = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar personais:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
