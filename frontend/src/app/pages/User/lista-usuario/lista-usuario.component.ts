import { Component } from '@angular/core';
import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';
import { UserSideabrComponent } from '../../../components/UserComponents/user-sideabr/user-sideabr.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [HeaderUsuarioComponent, UserSideabrComponent, FooterComponent],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent {

  
}
