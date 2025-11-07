import { Component, inject } from '@angular/core';
import { UserSideabrComponent } from '../../../components/UserComponents/user-sideabr/user-sideabr.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';
import { AlertDialogComponent, AlertDialogData } from '../../../components/alert-dialog/alert-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../services/loading.service';


@Component({
  selector: 'app-user-conta',
  standalone: true,
  imports: [
    UserSideabrComponent, 
    FooterComponent, 
    HeaderUsuarioComponent,
    AlertDialogComponent,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-conta.component.html',
  styleUrl: './user-conta.component.css'
})
export class UserContaComponent {

  private loadingService: LoadingService = inject(LoadingService);

  dados = {
    nome: 'Icaro Souza',
    email: 'icaro.123@gmail.com',
    cpf: '123.456.789-00',
    nascimento: '1990-01-01'
  }
  
 
  constructor(private dialog: MatDialog) {}

  
  onAlterar(): void {
    const dialogData: AlertDialogData = {
      title: 'Confirmar Alterações',
      message: 'Você tem certeza que deseja salvar as novas informações da sua conta? Esta ação é irreversível.',
      icon: 'warning', 
      type: 'error' 
    };

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: dialogData,
      disableClose: false, 
    });

    
    dialogRef.afterClosed().subscribe(confirmado => {
      
      if (confirmado) {
        this.salvarDados();
      } else {
        console.log('Alteração cancelada pelo usuário.');
      }
    });
  }
  
  
  private salvarDados(): void {
      
      this.loadingService.setLoading(true);
      setTimeout(() => {
        
        console.log('✅ Dados Salvos no Backend (Simulação)!', this.dados);
        
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

      }, 1000); 
  }
}