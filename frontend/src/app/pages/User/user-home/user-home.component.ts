import { Component } from '@angular/core';
import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';
import { UserSideabrComponent } from '../../../components/UserComponents/user-sideabr/user-sideabr.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [HeaderUsuarioComponent, UserSideabrComponent, FooterComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

}
