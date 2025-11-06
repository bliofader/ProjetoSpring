import { Component, OnInit } from '@angular/core';
import { HeaderPersonalComponent } from '../../../../components/header-personal/header-personal.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Personal } from '../../../../entities/personal';



@Component({
  selector: 'app-lista-personais-detalhes',
  standalone: true,
  imports: [HeaderPersonalComponent, FooterComponent, CommonModule],
  templateUrl: './lista-personais-detalhes.component.html',
  styleUrl: './lista-personais-detalhes.component.css'
})
export class ListaPersonaisDetalhesComponent implements OnInit {
  personal: any;

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const nome = this.route.snapshot.paramMap.get('nome');
    if (nome) {
      const nomeNormalizado = nome.replace(/-/g, ' ').toLowerCase();
      this.personal = this.personais.find(
        (ex) => ex.nome.toLowerCase() === nomeNormalizado
      );
    }
  }
}
