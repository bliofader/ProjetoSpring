import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { PersonalService } from '../../../services/personal.service';
import { Mensagem } from '../../../entities/mensagem';

import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';
import { UserSideabrComponent } from '../../../components/UserComponents/user-sideabr/user-sideabr.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-personal-mensagens',
  standalone: true,
  imports: [
    CommonModule,
    HeaderUsuarioComponent,
    UserSideabrComponent,
    FooterComponent
  ],
  templateUrl: './personal-mensagens.component.html',
  styleUrls: ['./personal-mensagens.component.css']
})
export class PersonalMensagensComponent implements OnInit {
  mensagens: Mensagem[] = [];
  isLoading = true;
  hasError = false;

  constructor(
    private authService: AuthService,
    private personalService: PersonalService
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    if (usuario && usuario.perfil.toLowerCase() === 'personal') {
      this.personalService.listarMensagens(usuario.usuarioId).subscribe({
        next: (res) => {
          this.mensagens = res;
          this.isLoading = false;
        },
        error: () => {
          this.hasError = true;
          this.isLoading = false;
        }
      });
    } else {
      this.hasError = true;
      this.isLoading = false;
    }
  }

  // ✅ Método para voltar
  voltar(): void {
    window.history.back();
  }
}
