import { Component } from '@angular/core';
import { HeaderUsuarioComponent } from '../../../components/header-usuario/header-usuario.component';
import { UserSideabrComponent } from '../../../components/UserComponents/user-sideabr/user-sideabr.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-user-treino',
  standalone: true,
  imports: [HeaderUsuarioComponent,UserSideabrComponent,FooterComponent],
  templateUrl: './user-treino.component.html',
  styleUrl: './user-treino.component.css'
})
export class UserTreinoComponent {

}
