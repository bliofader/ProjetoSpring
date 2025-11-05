import { Component } from '@angular/core';
import { UserSideabrComponent } from '../../../components/UserComponents/user-sideabr/user-sideabr.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';

@Component({
  selector: 'app-user-conta',
  standalone: true,
  imports: [UserSideabrComponent, FooterComponent, HeaderUsuarioComponent],
  templateUrl: './user-conta.component.html',
  styleUrl: './user-conta.component.css'
})
export class UserContaComponent {

}
