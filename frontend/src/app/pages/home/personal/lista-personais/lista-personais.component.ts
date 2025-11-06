import { Component, OnInit } from '@angular/core';
import { Personal } from '../../../../entities/personal';
import { HeaderPersonalComponent } from '../../../../components/header-personal/header-personal.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-personais',
  standalone: true,
  imports: [HeaderPersonalComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './lista-personais.component.html',
  styleUrl: './lista-personais.component.css'
})
export class ListaPersonaisComponent implements OnInit {

  personais: Personal[] = [{
    nome: 'Carlos Mendes',
    tipo: 'personal',
    dataNascimento: new Date('1990-05-10'),
    cpf: '123.456.789-00',
    email: 'carlos@fit.com',
    senha: '12345',
    imagePath: 'assets/images/tela-personal/personais/personalM.jpg',
    especialidade: 'Treinamento Funcional',
    descricao: 'Personal com 10 anos de experiência em reabilitação e força.',
    redeSocial: '@carlosfit'
  },
  {
      id: 2,
      nome: 'Juliana Alves',
      tipo: 'personal',
      dataNascimento: new Date('1993-08-15'),
      cpf: '987.654.321-00',
      email: 'juliana@fit.com',
      senha: '54321',
      imagePath: 'assets/images/tela-personal/personais/personalF.jpeg',
      especialidade: 'Hipertrofia e Emagrecimento',
      descricao: 'Focada em resultados e acompanhamento individualizado.',
      redeSocial: '@julianafit'
    }
  ];

  ngOnInit() { }
}

