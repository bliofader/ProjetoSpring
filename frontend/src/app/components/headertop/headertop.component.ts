import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { AlertDialogComponent, AlertDialogData } from '../../components/alert-dialog/alert-dialog.component'; 

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatIconModule, 
    AlertDialogComponent
  ],
  templateUrl: './headertop.component.html',
  styleUrl: './headertop.component.css',
})
export class HeaderTopComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog // Injeção do MatDialog
  ) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }

  // 5. Atualizar onLogout para usar o Material Dialog
  onLogout(): void {
    const dialogData: AlertDialogData = {
      title: 'Confirmação de Saída',
      message: 'Deseja realmente sair do sistema?',
      icon: 'logout', 
      type: 'error' 
    };
    
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: dialogData,
      disableClose: false, 
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.performLogout();
        sessionStorage.clear();
      } else {
        console.log('Logout cancelado.');
      }
    });
  }

  private performLogout(): void {
    this.router.navigate(['/']); 
    console.log('Sessão encerrada.');
  }

  onProfile(): void {
    console.log('Abrindo perfil...');
  }
}