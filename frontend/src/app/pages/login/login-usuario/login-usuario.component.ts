import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Imports do Material Dialog e Alerta
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlertDialogComponent, AlertDialogData } from '../../../components/alert-dialog/alert-dialog.component';

// Imports de Serviços
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../Models/login-request.model';
import { LoadingService } from '../../../services/loading.service'; // IMPORTADO LoadingService


@Component({
    selector: 'app-login-usuario',
    standalone: true,
    // Adicione os módulos do Material e o componente de Alerta aqui
    imports: [CommonModule, FormsModule, RouterModule, MatDialogModule, MatButtonModule, AlertDialogComponent],
    templateUrl: './login-usuario.component.html',
    styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent {
    email = '';
    senha = '';

    // Injeção de Serviços
    private loadingService: LoadingService = inject(LoadingService);
    
    constructor(
        private authService: AuthService, 
        private router: Router,
        private dialog: MatDialog // Injetado para abrir o Dialog
    ) {}
    
    /**
     * Função auxiliar para abrir o AlertDialogComponent e gerenciar o redirecionamento
     */
    openAlertDialog(data: AlertDialogData): void {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '350px',
            data: data,
            disableClose: true,
        });

        // O redirecionamento ocorre após o usuário fechar o alerta
        dialogRef.afterClosed().subscribe(() => {
            if (data.type === 'success') {
                const perfil = sessionStorage.getItem('usuarioPerfil');
                if (perfil?.toLowerCase() === 'admin') {
                    this.router.navigate(['/admin']);
                } else {
                    this.router.navigate(['/user/home']);
                }
            }
        });
    }

    onSubmit() {
        // 1. INICIA O CARREGAMENTO
        this.loadingService.setLoading(true);

        const credenciais: LoginRequest = {
            email: this.email,
            senha: this.senha
            // nomeUsuario não é necessário aqui, pois a API retorna
        };

        this.authService.login(credenciais).subscribe({
            next: (res) => {
                // Salva token e dados do usuário (usando os dados do response)
                this.authService.salvarToken(res.token, res.usuarioId, res.nomeUsuario, res.perfil);
                
                // Força um delay para a barra de carregamento ser visível
                setTimeout(() => {
                    this.loadingService.setLoading(false); // DESLIGA O CARREGAMENTO
                    
                    // 2. MOSTRA ALERTA DE SUCESSO
                    this.openAlertDialog({
                        title: 'Login Realizado!',
                        message: 'Acesso concedido. Você será redirecionado.',
                        icon: 'check_circle',
                        type: 'success'
                    });
                }, 500); // 500ms de atraso
            },
            error: () => {
                
                
                setTimeout(() => {
                    this.loadingService.setLoading(false); // DESLIGA O CARREGAMENTO

                    this.openAlertDialog({
                        title: 'Falha no Login',
                        message: 'E-mail ou senha incorretos. Verifique suas credenciais.',
                        icon: 'error_outline',
                        type: 'error'
                    });
                }, 500); 
            }
        });
    }
}