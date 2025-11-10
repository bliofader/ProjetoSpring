import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 
import { CommonModule } from '@angular/common'; 

export interface AlertDialogData {
  title: string;
  message: string;
  icon: string; 
  type: 'success' | 'error'; 
}

@Component({
  selector: 'app-alert-dialog',
  standalone: true,

  imports: [
    CommonModule,     
    MatDialogModule,  
    MatButtonModule,  
    MatIconModule     
  ],
  templateUrl: './alert-dialog.component.html',
  styles: [`
    .alert-header {
      display: flex;
      align-items: center;
      padding: 20px 24px 10px; 
    }
    .alert-header h2 {
        margin: 0;
    }
    .alert-header mat-icon {
      font-size: 30px;
      height: 30px;
      width: 30px;
      margin-right: 10px;
    }
    
    .alert-header.success mat-icon { color: #4CAF50; /* Verde */ }
    .alert-header.error mat-icon { color: #F44336; /* Vermelho */ }
  `]
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {}
}