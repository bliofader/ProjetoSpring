import { Component } from '@angular/core';
import { UserSideabrComponent } from '../../../components/UserComponents/user-sideabr/user-sideabr.component';
import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-user-personal',
  standalone: true,
  imports: [UserSideabrComponent, HeaderUsuarioComponent, FooterComponent],
  templateUrl: './user-personal.component.html',
  styleUrl: './user-personal.component.css'
})
export class UserPersonalComponent {

}
