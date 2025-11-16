import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalService } from '../../../services/personal.service';
import { HeaderPersonalComponent } from '../../../components/header-personal/header-personal.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ necessário para ngModel
import { Personal } from '../../../entities/personal';

@Component({
  selector: 'app-lista-personais-detalhes',
  standalone: true,
  imports: [HeaderPersonalComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './lista-personais-detalhes.component.html',
  styleUrl: './lista-personais-detalhes.component.css'
})
export class ListaPersonaisDetalhesComponent implements OnInit {
  personal!: Personal;
  isLoading = true;
  hasError = false;

  // ✅ estados para mensagens
  mensagem: string = '';
  mensagemEnviada = false;
  erroMensagem = false;

  constructor(
    private route: ActivatedRoute,
    private personalService: PersonalService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      console.error('ID não encontrado na rota');
      this.hasError = true;
      this.isLoading = false;
      return;
    }

    const id = Number(idParam);
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

  // ✅ método para enviar mensagem
  enviarMensagem(): void {
    if (!this.mensagem.trim()) return;

    const payload = {
      idPersonal: this.personal.id,
      conteudo: this.mensagem,
      // aqui você pode incluir também o id do usuário logado
    };

    this.personalService.enviarMensagem(payload).subscribe({
      next: () => {
        this.mensagemEnviada = true;
        this.erroMensagem = false;
        this.mensagem = '';
      },
      error: () => {
        this.erroMensagem = true;
        this.mensagemEnviada = false;
      }
    });
  }
}
