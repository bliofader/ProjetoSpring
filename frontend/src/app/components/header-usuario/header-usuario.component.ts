import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common'; 
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertDialogComponent, AlertDialogData } from '../alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-header-usuario',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, AlertDialogComponent], 
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.css'
})
export class HeaderUsuarioComponent implements OnInit {
  nomeUsuario: string | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog 
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const nomeStorage = localStorage.getItem('usuarioNome');

      if (nomeStorage) {
        this.nomeUsuario = this.NomeArrumado(nomeStorage);
      }
    }
  }

  NomeArrumado(str: string): string {
    if (!str) {
      return '';
    }
    str = str.toLowerCase();
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
  }

  private openLogoutConfirmDialog(): void {
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

    dialogRef.afterClosed().subscribe(result => {
     
      if (result) {
        this.performLogout();
      }
   
    });
  }
  
  private performLogout(): void {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.clear();
      }
      this.router.navigate(['/']);
  }
  onLogout(): void {
    this.openLogoutConfirmDialog();
  }
}