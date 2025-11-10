import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { LoadingService } from '../../services/loading.service'; 

@Component({
  selector: 'app-global-loading-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    @if (loadingService.isLoading()) {
      <mat-progress-bar mode="indeterminate" class="global-loading-bar"></mat-progress-bar>
    }
  `,
  styles: [`
    .global-loading-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999; 
      height: 5px; 
    }
  `]
})
export class GlobalLoadingBarComponent {
  public loadingService = inject(LoadingService);
}