import { Component } from '@angular/core';
import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';
import { UserSideabrComponent } from '../../../components/UserComponents/user-sideabr/user-sideabr.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [HeaderUsuarioComponent, UserSideabrComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

}
