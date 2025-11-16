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
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entities/usuario';

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
    const storedId = sessionStorage.getItem('usuarioId');

    if (storedId) {
      this.usuarioId = +storedId;

      this.usuarioService.findById(this.usuarioId).subscribe({
        next: (res: Usuario) => {
          console.log("🧠 Dados do usuário:", res);

          // Corrige o formato da data para yyyy-MM-dd antes de jogar no HTML
          if (res.dataNascimento) {
            res.dataNascimento = this.formatarData(res.dataNascimento);
          }

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

    const dadosAlteraveis: any = {
      nome: this.dados.nome,
      email: this.dados.email,
      cpf: this.dados.cpf,
      dataNascimento: this.formatarData(this.dados.dataNascimento)
    };

    // ❗ Valida antes de enviar
    if (!dadosAlteraveis.dataNascimento) {
      this.loadingService.setLoading(false);

      this.dialog.open(AlertDialogComponent, {
        width: '350px',
        data: {
          title: 'Data inválida',
          message: 'Selecione uma data de nascimento válida.',
          icon: 'error',
          type: 'error'
        } as AlertDialogData
      });

      return;
    }

    this.usuarioService.atualizarDados(this.usuarioId, dadosAlteraveis).subscribe({
      next: () => {
        this.loadingService.setLoading(false);

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

  // ✔ Formatador de data completo (nunca retorna null)
  private formatarData(data: any): string {
    if (!data) return "";

    if (typeof data === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data)) {
      return data;
    }

    const d = new Date(data);
    if (isNaN(d.getTime())) return "";

    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  }
}
