import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";


import { GlobalLoadingBarComponent } from './components/global-loading-bar/global-loading-bar.component'; 
import { HeaderUsuarioComponent } from './components/header-usuario/header-usuario.component';

// import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FooterComponent, NavbarComponent, GlobalLoadingBarComponent, HeaderUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ corrigido
})
export class AppComponent {
  title = 'Gymfy';
}