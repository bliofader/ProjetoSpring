import { Component } from '@angular/core';
import { HeaderUsuarioComponent } from "../../../components/header-usuario/header-usuario.component";

@Component({
  selector: 'app-tela-personal-inicial',
  standalone: true,
  imports: [HeaderUsuarioComponent],
  templateUrl: './tela-personal-inicial.component.html',
  styleUrl: './tela-personal-inicial.component.css'
})
export class TelaPersonalInicialComponent {

}
