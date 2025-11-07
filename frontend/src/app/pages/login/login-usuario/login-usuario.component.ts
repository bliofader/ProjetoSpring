import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlertDialogComponent, AlertDialogData } from '../../../components/alert-dialog/alert-dialog.component';

import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../Models/login-request.model';
import { LoadingService } from '../../../services/loading.service';


@Component({
    selector: 'app-login-usuario',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, AlertDialogComponent],
    templateUrl: './login-usuario.component.html',
    styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {

    credenciais: LoginRequest = { email: '', senha: ''};

    // 1. O LoadingService é injetado aqui
    private loadingService: LoadingService = inject(LoadingService);

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private authService: AuthService
    ) { }

    openAlertDialog(data: AlertDialogData): void {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '350px',
            data: data,
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe(() => {
            if (data.type === 'success') {
                this.router.navigate(['/user/home']);
            }
        });
    }

    onSubmit() {
        
        this.loadingService.setLoading(true); 

        const payload: LoginRequest = {
            email: this.credenciais.email,
            senha: this.credenciais.senha,
            nomeUsuario: this.credenciais.nomeUsuario, 
        };

        this.authService.login(payload).subscribe({
            next: (response) => {
                
                this.authService.salvarToken(response.token);
                const nomeUsuario = response.nome || 'Usuário'; 
                localStorage.setItem('usuarioNome', nomeUsuario); 
                setTimeout(() => {
                this.loadingService.setLoading(false); 
                this.openAlertDialog({
                    title: 'Sucesso!',
                    message: `Login realizado com sucesso! Bem-vindo(a), ${nomeUsuario}.`,
                    icon: 'check_circle',
                    type: 'success'
                });
                }, 1000);

                

            },
            error: (error) => {
                
                console.error('Erro de Login:', error);

                let mensagem = 'Erro desconhecido. Tente novamente mais tarde.';

                if (error.status === 401 || error.status === 403) {
                    mensagem = 'E-mail ou senha incorretos. Verifique suas credenciais.';
                } else if (error.status === 0) {
                    mensagem = 'Não foi possível conectar ao servidor. Verifique sua conexão ou status da API.';
                }

                setTimeout(() => {
                this.loadingService.setLoading(false); 
                this.openAlertDialog({
                    title: 'Acesso Negado',
                    message: mensagem,
                    icon: 'error_outline',
                    type: 'error'
                });
                }, 500); 
                
            }
        });
    }
}