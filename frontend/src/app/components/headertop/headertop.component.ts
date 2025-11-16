import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent, AlertDialogData } from '../../components/alert-dialog/alert-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule, AlertDialogComponent, MatButtonModule, MatIconModule],
  templateUrl: './headertop.component.html',
  styleUrl: './headertop.component.css',
})
export class HeaderTopComponent {
  
  constructor(
    private router: Router,
    private dialog: MatDialog 
  ) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }

  onProfile(): void {
    console.log('Abrindo perfil...');
  }
  
  onLogout(): void {
    const dialogData: AlertDialogData = {
      title: 'Confirmar Saída',
      message: 'Você tem certeza que deseja sair do painel administrativo?',
      icon: 'logout', 
      type: 'error'
    };
    
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.performLogout();
      } else {
        console.log('Logout cancelado.');
      }
    });
  }
  
  private performLogout(): void {
    sessionStorage.clear(); 
    this.router.navigate(['/']); 
  }
}