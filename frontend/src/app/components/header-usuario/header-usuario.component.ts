import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// Imports do Material Dialog e Alerta
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent, AlertDialogData } from '../../components/alert-dialog/alert-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule, MatButtonModule, MatIconModule, AlertDialogComponent],
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.css'
})
export class HeaderUsuarioComponent implements OnInit {
  nomeUsuario: string | null = null;
  
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    
    this.nomeUsuario = sessionStorage.getItem('usuarioNome');
  }
  
  onLogout(): void {
    const dialogData: AlertDialogData = {
      title: 'Confirmação de Saída',
      message: 'Deseja realmente sair do sistema e encerrar sua sessão?',
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