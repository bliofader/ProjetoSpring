import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalService } from '../../../services/personal.service';
import { HeaderPersonalComponent } from '../../../components/header-personal/header-personal.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Personal } from '../../../entities/personal';
import { AuthService } from '../../../services/auth.service';

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

  // ✅ usuário logado
  usuarioLogado: { nome: string; perfil: string; usuarioId: number } | null = null;

  constructor(
    private route: ActivatedRoute,
    private personalService: PersonalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // pega usuário logado do AuthService
    this.usuarioLogado = this.authService.getUsuario();
    console.log('Usuário logado:', this.usuarioLogado); // debug

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
    if (!this.usuarioLogado || this.usuarioLogado.perfil?.toLowerCase() !== 'comum') {
      alert('Somente usuários comuns logados podem enviar mensagens.');
      return;
    }

    if (!this.mensagem.trim()) return;

    const payload = {
      idUsuario: this.usuarioLogado.usuarioId,
      idPersonal: this.personal.id,
      conteudo: this.mensagem
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
