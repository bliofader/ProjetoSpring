import { Component, inject, OnInit } from '@angular/core';
import { UserSideabrComponent } from '../../../components/UserComponents/user-sideabr/user-sideabr.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';
import { AlertDialogComponent, AlertDialogData } from '../../../components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../services/loading.service';
import { UsuarioService, Usuario } from '../../../services/UsuarioService';

@Component({
  selector: 'app-user-conta',
  standalone: true,
  imports: [
    UserSideabrComponent, 
    FooterComponent, 
    HeaderUsuarioComponent,
    AlertDialogComponent,
    MatButtonModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-conta.component.html',
  styleUrls: ['./user-conta.component.css']
})
export class UserContaComponent implements OnInit {

  private loadingService = inject(LoadingService);
  private usuarioService = inject(UsuarioService);
  private dialog = inject(MatDialog);

  dados: Partial<Usuario> = {};
  usuarioId!: number;

  ngOnInit(): void {
    const storedId = localStorage.getItem('usuarioId');
    if (storedId) {
      this.usuarioId = +storedId;
      this.usuarioService.getUsuarioById(this.usuarioId).subscribe({
        next: (res: Usuario) => {
          console.log("🧠 Dados do usuário:", res);
          this.dados = res;
        },
        error: (err: any) => {
          console.error("Erro ao buscar dados do usuário:", err);
        }
      });
    } else {
      console.error("ID do usuário não encontrado na storage.");
    }
  }

  onAlterar(): void {
    const dialogData: AlertDialogData = {
      title: 'Confirmar Alterações',
      message: 'Deseja realmente salvar as novas informações?',
      icon: 'warning',
      type: 'error'
    };

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.salvarDados();
      }
    });
  }

  private salvarDados(): void {
    if (!this.usuarioId) {
      console.error("ID do usuário indefinido.");
      return;
    }

    this.loadingService.setLoading(true);

    const dadosAlteraveis: Partial<Usuario> = {
      nome: this.dados.nome,
      email: this.dados.email,
      cpf: this.dados.cpf,
      dataNascimento: this.dados.dataNascimento
    };

    this.usuarioService.atualizarUsuario(this.usuarioId, dadosAlteraveis).subscribe({
      next: (res: Usuario) => {
        this.loadingService.setLoading(false);

        localStorage.setItem('usuarioNome', res.nome);

        this.dados = res;

        this.dialog.open(AlertDialogComponent, {
          width: '350px',
          data: {
            title: 'Dados Atualizados',
            message: 'Suas informações foram salvas com sucesso!',
            icon: 'check_circle',
            type: 'success'
          } as AlertDialogData
        });
      },
      error: (err: any) => {
        this.loadingService.setLoading(false);
        console.error('Erro ao salvar dados', err);
      }
    });
  }
}
